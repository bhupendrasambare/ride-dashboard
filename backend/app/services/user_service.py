from app.database import get_database
from app.models.users import UserInDb
from app.utils.security import hash_password, verify_password
from bson import ObjectId
from datetime import datetime

USERS_COLLECTION = "users"

async def find_by_email(email:str):
    db = get_database()
    doc = await db[USERS_COLLECTION].find_one({"email":email})

    if not doc:
        return None
    
    doc["id"] = str(doc["_id"])
    return UserInDb(**{
        "id": str(doc["_id"]),
        "email": doc["email"],
        "hashed_password": doc["hashed_password"],
        "full_name": doc.get("full_name"),
        "is_active": doc.get("is_active"),
        "created_at": doc.get("created_at", datetime.utcnow())
    })

async def create_user(email:str, password: str, full_name: str | None == None):
    db = get_database()
    hashed = hash_password(password)
    doc = {
        "email":email,
        "hashed_password": hashed,
        "full_name": full_name,
        "is_active": True,
        "created_at": datetime.utcnow()
    }

    result = await db[USERS_COLLECTION].insert_one(doc)
    doc["id"] = str(result.inserted_id)
    return UserInDb(**doc)

async def authenticate_user(user_id:str, password:str):
    user = await find_by_email(user_id)
    if not user:
        return None
    
    if not verify_password(password, user.hashed_password):
        return None
    return user



async def get_user_by_id(user_id:str):
    db = get_database()
    try:
        _id = ObjectId(user_id)
    except Exception:
        return None
    
    doc = await db[USERS_COLLECTION].find_one({"_id":_id})

    if not doc:
        return None
    
    doc["id"] = str(doc["_id"])
    return UserInDb(**{
        "id": str(doc["_id"]),
        "email": doc["email"],
        "hashed_password": doc["hashed_password"],
        "full_name": doc.get("full_name"),
        "is_active": doc.get("is_active"),
        "created_at": doc.get("created_at", datetime.utcnow())
    })