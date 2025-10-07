from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class RegisterUser(BaseModel):
    email:EmailStr
    password:str = Field(min_length=6)
    full_name = Optional[str] = None