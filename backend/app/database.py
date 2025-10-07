from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "ride-dashboard")

mongo_client :AsyncIOMotorClient | None = None

def get_database():
    global mongo_client
    if mongo_client is None:
        mongo_client = AsyncIOMotorClient(MONGO_URI)
    return mongo_client[DB_NAME]

async def close_database():
    global mongo_client
    if mongo_client is not None:
        mongo_client.close()
        mongo_client = None
