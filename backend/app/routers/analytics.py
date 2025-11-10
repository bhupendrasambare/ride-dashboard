import os
import pandas as pd
import random
from fastapi import APIRouter, HTTPException, Query
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
from pydantic import BaseModel
from dotenv import load_dotenv
from fastapi import UploadFile, File


load_dotenv()

router = APIRouter(prefix="/api/v1/rides", tags=["Rides Analysis"])

DATA_PATH = "/Users/bhupendrasam1404/Project/Python/fast-api/ride-dashboard/backend/data/dataset.csv"

DATA_FOLDER = os.getenv("DATA_FOLDER_PATH")
if not DATA_FOLDER:
    raise HTTPException(status_code=500, detail="DATA_FOLDER_PATH not found in environment variables")

class TrainResponse(BaseModel):
    total_records: int
    numeric_columns: list
    categorical_columns: list
    correlation_keys: list
    model_score: float


def load_data():
    if not os.path.exists(DATA_PATH):
        raise HTTPException(status_code=404, detail="CSV file not found")
    df = pd.read_csv(DATA_PATH, na_values=["null", "NULL", "NaN", ""])
    if "Date" in df.columns:
        df["Date"] = pd.to_datetime(df["Date"], errors="coerce")
    return df


def apply_filters(
    df: pd.DataFrame,
    start_date: str | None = None,
    end_date: str | None = None,
    vehicle_type: str | None = None,
    booking_status: str | None = None,
    payment_method: str | None = None,
):
    if start_date:
        df = df[df["Date"] >= pd.to_datetime(start_date, errors="coerce")]
    if end_date:
        df = df[df["Date"] <= pd.to_datetime(end_date, errors="coerce")]
    if vehicle_type and vehicle_type.lower() != "all":
        df = df[df["Vehicle Type"].str.lower() == vehicle_type.lower()]
    if booking_status and booking_status.lower() != "all":
        df = df[df["Booking Status"].str.lower() == booking_status.lower()]
    if payment_method and payment_method.lower() != "all":
        df = df[df["Payment Method"].str.lower() == payment_method.lower()]
    return df

@router.get("/files")
def list_data_files():
    """Return all CSV files inside the data folder"""
    if not os.path.exists(DATA_FOLDER):
        raise HTTPException(status_code=404, detail=f"Data folder not found at {DATA_FOLDER}")

    files = []
    for file_name in os.listdir(DATA_FOLDER):
        file_path = os.path.join(DATA_FOLDER, file_name)
        if os.path.isfile(file_path):
            stats = os.stat(file_path)
            files.append({
                "file_name": file_name,
                "file_path": file_path,
                "size_kb": round(stats.st_size / 1024, 2),
                "last_modified": os.path.getmtime(file_path)
            })

    if not files:
        raise HTTPException(status_code=404, detail="No files found in the data folder")

    return {"total_files": len(files), "files": files}

@router.get("/file-info")
def get_file_info(file_name: str | None = None):
    """
    Get total records and column details (name, dtype, null count) for a given CSV file.
    If file_name is not provided, use the default dataset.csv.
    """
    if not DATA_FOLDER:
        raise HTTPException(status_code=500, detail="DATA_FOLDER_PATH not configured")

    # Default to dataset.csv if no file name is provided
    file_name = file_name or "dataset.csv"
    file_path = os.path.join(DATA_FOLDER, file_name)

    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail=f"File '{file_name}' not found in data folder")

    try:
        df = pd.read_csv(file_path, na_values=["null", "NULL", "NaN", ""])
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading file: {e}")

    # Prepare response data
    columns_info = []
    for col in df.columns:
        columns_info.append({
            "column_name": col,
            "dtype": str(df[col].dtype),
            "null_count": int(df[col].isnull().sum())
        })

    response = {
        "file_name": file_name,
        "total_records": int(len(df)),
        "total_columns": len(df.columns),
        "columns": columns_info
    }

    return response


@router.post("/upload-csv")
async def upload_csv(file: UploadFile = File(...)):
    """
    Upload a new CSV file to the data folder.
    Validates the file type, saves it, and returns file details.
    """
    if not DATA_FOLDER:
        raise HTTPException(status_code=500, detail="DATA_FOLDER_PATH not configured")

    # Ensure the file is a CSV
    if not file.filename.lower().endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only CSV files are allowed")

    # Create folder if not exists
    os.makedirs(DATA_FOLDER, exist_ok=True)

    file_path = os.path.join(DATA_FOLDER, file.filename)

    # Save uploaded file
    try:
        with open(file_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving file: {e}")

    # Validate by loading into pandas
    try:
        df = pd.read_csv(file_path, na_values=["null", "NULL", "NaN", ""])
    except Exception as e:
        # Delete invalid file if it can't be read properly
        os.remove(file_path)
        raise HTTPException(status_code=400, detail=f"Invalid CSV file: {e}")

    response = {
        "message": "File uploaded successfully",
        "file_name": file.filename,
        "file_size_kb": round(len(content) / 1024, 2),
        "total_records": int(len(df)),
        "total_columns": len(df.columns),
        "columns": list(df.columns)
    }

    return response

@router.get("/booking-status")
def booking_status_distribution(
    start_date: str | None = Query(None),
    end_date: str | None = Query(None),
    vehicle_type: str | None = Query(None),
    payment_method: str | None = Query(None),
    file_name: str | None = Query(None, description="Optional CSV file name to analyze"),
):
    """
    Analyze booking status distribution.
    If `file_name` is provided, the analysis is done on that file from DATA_FOLDER.
    Otherwise, the default dataset.csv from DATA_PATH is used.
    """

    # Determine which file to load
    if file_name:
        file_path = os.path.join(DATA_FOLDER, file_name)
        if not os.path.exists(file_path):
            raise HTTPException(status_code=404, detail=f"File '{file_name}' not found in data folder")
    else:
        file_path = DATA_PATH

    # Load CSV file
    try:
        df = pd.read_csv(file_path, na_values=["null", "NULL", "NaN", ""])
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading file: {e}")

    # Convert date if present
    if "Date" in df.columns:
        df["Date"] = pd.to_datetime(df["Date"], errors="coerce")

    # Apply filters
    df = apply_filters(df, start_date, end_date, vehicle_type, None, payment_method)

    # Validate required column
    if "Booking Status" not in df.columns:
        raise HTTPException(status_code=400, detail="Column 'Booking Status' not found in dataset")

    # Compute distribution
    data = df["Booking Status"].value_counts().reset_index()
    data.columns = ["BookingStatus", "count"]

    return {
        "file_analyzed": os.path.basename(file_path),
        "total_records": len(df),
        "distribution": data.to_dict(orient="records")
    }



@router.get("/booking-value")
def booking_value_trend(
    start_date: str | None = Query(None),
    end_date: str | None = Query(None),
    vehicle_type: str | None = Query(None),
    booking_status: str | None = Query(None),
    payment_method: str | None = Query(None),
):
    df = load_data()
    df = apply_filters(df, start_date, end_date, vehicle_type, booking_status, payment_method)
    df["Booking Value"] = pd.to_numeric(df["Booking Value"], errors="coerce")
    df = df.dropna(subset=["Date", "Booking Value"])
    daily_values = df.groupby("Date")["Booking Value"].sum().reset_index()
    daily_values.columns = ["Date", "BookingValue"]
    return daily_values.to_dict(orient="records")


@router.get("/payment-method")
def payment_method_distribution(
    start_date: str | None = Query(None),
    end_date: str | None = Query(None),
    vehicle_type: str | None = Query(None),
    booking_status: str | None = Query(None),
):
    df = load_data()
    df = apply_filters(df, start_date, end_date, vehicle_type, booking_status)
    data = df["Payment Method"].value_counts().reset_index()
    data.columns = ["PaymentMethod", "count"]
    return data.to_dict(orient="records")


@router.get("/trend-forecast")
def booking_trend_forecast(
    start_date: str | None = Query(None),
    end_date: str | None = Query(None),
    vehicle_type: str | None = Query(None),
    booking_status: str | None = Query(None),
    payment_method: str | None = Query(None),
):
    df = load_data()
    df = apply_filters(df, start_date, end_date, vehicle_type, booking_status, payment_method)
    df["Booking Value"] = pd.to_numeric(df["Booking Value"], errors="coerce")
    df = df.dropna(subset=["Date", "Booking Value"])
    df["Date"] = pd.to_datetime(df["Date"])
    df = (
        df.groupby(df["Date"].dt.to_period("D"))
        .agg({"Booking Value": "mean"})
        .reset_index()
    )
    df["Date"] = df["Date"].dt.to_timestamp()
    forecast = [
        {
            "Date": row["Date"].strftime("%Y-%m-%d"),
            "BookingValue": round(row["Booking Value"] + random.uniform(-50, 50), 2),
        }
        for _, row in df.iterrows()
    ]
    return forecast


@router.get("/ratings")
def ratings_trend(
    start_date: str | None = Query(None),
    end_date: str | None = Query(None),
    vehicle_type: str | None = Query(None),
    booking_status: str | None = Query(None),
):
    df = load_data()
    df = apply_filters(df, start_date, end_date, vehicle_type, booking_status)
    df["Driver Ratings"] = pd.to_numeric(df["Driver Ratings"], errors="coerce")
    df["Customer Rating"] = pd.to_numeric(df["Customer Rating"], errors="coerce")
    df = df.dropna(subset=["Date", "Driver Ratings", "Customer Rating"])
    avg_ratings = (
        df.groupby("Date")[["Driver Ratings", "Customer Rating"]]
        .mean()
        .reset_index()
    )
    avg_ratings.columns = ["Date", "DriverRatings", "CustomerRating"]
    avg_ratings["DriverRatings"] = avg_ratings["DriverRatings"].round(2)
    avg_ratings["CustomerRating"] = avg_ratings["CustomerRating"].round(2)
    return avg_ratings.to_dict(orient="records")


@router.get("/vehicle-type")
def vehicle_type_usage(
    start_date: str | None = Query(None),
    end_date: str | None = Query(None),
    booking_status: str | None = Query(None),
    payment_method: str | None = Query(None),
):
    df = load_data()
    df = apply_filters(df, start_date, end_date, None, booking_status, payment_method)
    data = df["Vehicle Type"].value_counts().reset_index()
    data.columns = ["VehicleType", "count"]
    return data.to_dict(orient="records")


@router.get("/train", response_model=TrainResponse)
def train_ride_data(
    start_date: str | None = Query(None),
    end_date: str | None = Query(None),
    vehicle_type: str | None = Query(None),
    booking_status: str | None = Query(None),
    payment_method: str | None = Query(None),
):
    if not os.path.exists(DATA_PATH):
        raise HTTPException(status_code=404, detail=f"CSV file not found at {DATA_PATH}")

    df = load_data()
    df = apply_filters(df, start_date, end_date, vehicle_type, booking_status, payment_method)

    if df.empty:
        raise HTTPException(status_code=400, detail="No records found after filtering")

    df["Booking Value"] = pd.to_numeric(df["Booking Value"], errors="coerce")
    df = df.dropna(subset=["Booking Value"])
    if df.empty:
        raise HTTPException(status_code=400, detail="No valid rows with 'Booking Value' found for training")

    numeric_cols = df.select_dtypes(include=["int64", "float64"]).columns.tolist()
    categorical_cols = df.select_dtypes(include=["object"]).columns.tolist()

    df_encoded = df.copy()
    for col in categorical_cols:
        try:
            le = LabelEncoder()
            df_encoded[col] = le.fit_transform(df[col].astype(str))
        except Exception:
            continue

    X = df_encoded.drop(columns=["Booking Value"])
    y = df_encoded["Booking Value"]
    X = X.replace([float("inf"), float("-inf")], None).dropna()
    X, y = X.align(y, join="inner", axis=0)
    if X.empty or y.empty:
        raise HTTPException(status_code=400, detail="Not enough valid data for training after cleaning")

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    score = model.score(X_test, y_test)
    corr = df_encoded.corr(numeric_only=True)
    correlation_keys = corr["Booking Value"].dropna().sort_values(ascending=False).index.tolist()

    return TrainResponse(
        total_records=len(df),
        numeric_columns=numeric_cols,
        categorical_columns=categorical_cols,
        correlation_keys=correlation_keys[:10],
        model_score=round(score, 3),
    )
