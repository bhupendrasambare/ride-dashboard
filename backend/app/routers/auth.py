from fastapi import APIRouter, HTTPException, status, Depends
from datetime import datetime, timedelta
from app.models.schemas import RegisterUser, UserResponse, TokenResponse, LoginRequest
from app.services.user_service import find_by_email, create_user, authenticate_user
from app.utils.security import create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES


router = APIRouter(prefix="/api/v1/auth", tags=["Authentication"])

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED,
              responses={400: {"description": "Email already exists"}})
async def register_user(payload: RegisterUser):
    existing_email = await find_by_email(payload.email)

    if existing_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email address exists")
    user = await create_user(payload.email, payload.password, payload.full_name)
    return UserResponse(id=user.id, email = user.email, full_name= user.full_name, is_active=user.is_active, created_at=user.created_at)


@router.post("/token", response_model = TokenResponse)
async def token(form_data:LoginRequest = Depends()):
    user = await authenticate_user(form_data.email, form_data.password)

    if not user:
        raise HTTPException(
            status_code = status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect credentials",
            headers={"WWW-Authenticate": "Bearer"}
        )
    expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(subject=user.id, expries_delta=expires)
    expires_at = datetime.utcnow() + expires

    return TokenResponse(access_token=access_token, expires_at=expires_at)
