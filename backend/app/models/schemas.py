from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class RegisterUser(BaseModel):
    email:EmailStr
    password:str = Field(min_length=6)
    full_name: Optional[str] = None

class LoginRequest(BaseModel):
    email:EmailStr
    password:str

class UserResponse(BaseModel):
    id:str
    email:EmailStr
    full_name: Optional[str] = None
    is_active:bool
    created_at: datetime

class TokenResponse(BaseModel):
    access_token: str
    token_type:str = "Bearer"
    expires_at: datetime
