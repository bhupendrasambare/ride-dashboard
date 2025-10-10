from fastapi import APIRouter, Depends
from app.models.schemas import UserResponse
from app.utils.auth import get_current_user

router = APIRouter(prefix="/api/v1/user", tags=["User Apis"])

@router.get("/me", response_model = UserResponse)
async def get_me(current_user = Depends(get_current_user)):
    return UserResponse(
        id = current_user.id,
        email= current_user.email,
        full_name = current_user.full_name,
        is_active = current_user.is_active,
        created_at = current_user.created_at)
