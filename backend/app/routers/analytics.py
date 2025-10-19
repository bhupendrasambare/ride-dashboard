import os
import pandas as pd
from fastapi import APIRouter, HTTPException
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
from pydantic import BaseModel

router = APIRouter(prefix="/rides", tags=["Rides Analysis"])

DATA_PATH = "./backend/data/rides.csv"

class TrainResponse(BaseModel):
    total_records: int
    numeric_columns: list
    categorical_columns: list
    correlation_keys: list
    model_score: float


@router.get("/train", response_model=TrainResponse)
def train_ride_data():
    """
    Reads the CSV file from ./backend/data/rides.csv,
    performs preprocessing and trains a sample model.
    Returns dataset insights and model performance.
    """
    # Check if CSV exists
    if not os.path.exists(DATA_PATH):
        raise HTTPException(status_code=404, detail=f"CSV file not found at {DATA_PATH}")

    # Load CSV file
    try:
        df = pd.read_csv(DATA_PATH)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading CSV file: {str(e)}")

    if df.empty:
        raise HTTPException(status_code=400, detail="CSV file is empty")

    # Identify numeric and categorical columns
    numeric_cols = df.select_dtypes(include=["int64", "float64"]).columns.tolist()
    categorical_cols = df.select_dtypes(include=["object"]).columns.tolist()

    # Encode categorical columns
    df_encoded = df.copy()
    label_encoders = {}
    for col in categorical_cols:
        le = LabelEncoder()
        try:
            df_encoded[col] = le.fit_transform(df[col].astype(str))
            label_encoders[col] = le
        except Exception:
            continue

    # Define features and target (example: predict Booking Value)
    target_col = "Booking Value"
    if target_col not in df_encoded.columns:
        raise HTTPException(status_code=400, detail=f"'{target_col}' column not found for training")

    X = df_encoded.drop(columns=[target_col])
    y = df_encoded[target_col]

    # Split dataset
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train a simple model
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    score = model.score(X_test, y_test)

    # Compute correlations
    corr = df_encoded.corr(numeric_only=True)
    correlation_keys = corr[target_col].dropna().sort_values(ascending=False).index.tolist()

    return TrainResponse(
        total_records=len(df),
        numeric_columns=numeric_cols,
        categorical_columns=categorical_cols,
        correlation_keys=correlation_keys[:10],
        model_score=round(score, 3)
    )
