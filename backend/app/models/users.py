from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class UserInDb(BaseModel):
    id: Optional[str] = None
    email: EmailStr
    hashed_password: str
    full_name: Optional[str] = None
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        orm_mode = True
