# 🧭 Data Insights Hub

A **full-stack Python + React.js application** for analyzing rides data from CSV files.
This project provides **user authentication**, **data visualization**, and **insight generation** using Python-powered analytics and a modern React-based frontend.

---

## 🚀 Features

### 🧮 Backend (FastAPI + MongoDB)

* User **registration and login** with JWT authentication
* CSV **upload and analysis** using **Pandas** and **NumPy**
* **Matplotlib** visualizations generated dynamically
* MongoDB integration with **Motor** (async driver)
* Secure password hashing using **Bcrypt**
* Environment-based configuration with `.env`
* **Swagger UI** and **ReDoc** for API documentation

### 💻 Frontend (React + Vite)

* Modern **React 19** frontend built with **Vite**
* Responsive UI using **Bootstrap 5** and **React Bootstrap**
* **Protected routes** based on user login
* Interactive dashboards using **Recharts**
* Global state management with **Zustand**
* **Toast notifications** for user feedback
* Clean and animated landing page (see sample below)

---

## 🧩 Tech Stack

| Layer             | Technologies                                                        |
| ----------------- | ------------------------------------------------------------------- |
| **Frontend**      | React 19, Vite, Bootstrap 5, React Router, Zustand, Axios, Recharts |
| **Backend**       | FastAPI, Uvicorn, Motor (MongoDB), Pandas, NumPy, Matplotlib        |
| **Auth**          | JWT (PyJWT), Bcrypt                                                 |
| **Database**      | MongoDB                                                             |
| **Visualization** | Pandas + Matplotlib                                                 |
| **Tools**         | ESLint, dotenv, GitHub Actions ready                                |

---

## ⚙️ Setup Instructions

### 🔹 1. Clone the Repository

```bash
git clone https://github.com/your-username/data-insights-hub.git
cd data-insights-hub
```

---

### 🔹 2. Backend Setup (FastAPI)

#### a. Navigate to backend

```bash
cd backend
```

#### b. Create a virtual environment

```bash
python -m venv venv
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate     # Windows
```

#### c. Install dependencies

```bash
pip install -r requirements.txt
```

#### d. Run the FastAPI server

```bash
uvicorn main:app --reload
```

#### e. API Docs available at:

* Swagger UI → [http://localhost:8000/docs](http://localhost:8000/docs)
* ReDoc → [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

### 🔹 3. Frontend Setup (React + Vite)

#### a. Navigate to frontend

```bash
cd ../frontend
```

#### b. Install dependencies

```bash
npm install
```

#### c. Run the development server

```bash
npm run dev
```

#### d. Visit:

👉 [http://localhost:5173](http://localhost:5173)

---

## 🔐 Environment Variables

Create a `.env` file in the backend folder:

```bash
MONGO_URL=mongodb://localhost:27017/ridedata
JWT_SECRET=your_secret_key
JWT_ALGORITHM=HS256
```

---

## 📊 CSV Analysis Workflow

1. Login using your credentials (JWT-secured)
2. Upload a rides CSV file (columns like `Date`, `Time`, `Pickup`, `Drop`, `Duration`, `Fare`)
3. Backend analyzes it using **Pandas**:

   * Compute ride counts, durations, fare trends
   * Generate graphs (e.g. daily rides, avg fare trends)
4. Frontend displays visualizations using **Recharts**

---

## 🧠 Future Enhancements

* Add **AI-powered trend prediction**
* Implement **user roles** (admin, analyst)
* Export analytics as **PDF reports**
* Add **real-time dashboards**

---

## 👨‍💻 Developer

**Bhupendra Sambare**
📧 [bhupendrasam1404@gmail.com](mailto:bhupendrasam1404@gmail.com)
🌐 [github.com/bhupendrasambare](https://github.com/bhupendrasambare)

---

## 🪄 Sample Landing Page

The `LandingPage.jsx` highlights the technologies used — powered by **Bootstrap Carousel**, **React Router**, and **Framer Motion** animations for smooth transitions.
