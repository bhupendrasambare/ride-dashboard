from fastapi import FastAPI
from app.database import get_database, close_database
from app.routers import auth, users
import os

app = FastAPI(title="Ride analysis Apis", version="1.0.0")

app.include_router(auth.router)
app.include_router(users.router)

@app.on_event("startup")
async def startup_event():
    _ = get_database()


@app.on_event("shutdown")
async def shutdown_event():
    await close_database()

