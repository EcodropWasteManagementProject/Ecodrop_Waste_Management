from __future__ import annotations

import logging

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.core.security import create_access_token, hash_password, verify_password
from app.db.session import get_db
from app.models import RoleEnum, User
from app.schemas.auth import AuthResponse, LoginRequest, RegistrationRequest, UserResponse

logger = logging.getLogger("ecodrop.auth")
router = APIRouter(prefix="/auth", tags=["authentication"])


def _auth_response(user: User) -> AuthResponse:
    access_token, expires_in = create_access_token(user.id)
    return AuthResponse(
        access_token=access_token,
        expires_in=expires_in,
        user=UserResponse.model_validate(user),
    )


@router.post("/register", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
def register(payload: RegistrationRequest, db: Session = Depends(get_db)) -> AuthResponse:
    normalized_email = str(payload.email).strip().lower()
    existing_user = db.scalar(select(User).where(func.lower(User.email) == normalized_email))
    if existing_user:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="An account with this email already exists.")

    user = User(
        email=normalized_email,
        full_name=payload.full_name,
        password_hash=hash_password(payload.password),
        phone=payload.phone.strip() if payload.phone else None,
        address=payload.address.strip() if payload.address else None,
        role=RoleEnum.CITIZEN,
        is_active=True,
    )
    db.add(user)
    try:
        db.flush()
        access_token, expires_in = create_access_token(user.id)
        db.commit()
    except IntegrityError:
        db.rollback()
        duplicate = db.scalar(select(User.id).where(func.lower(User.email) == normalized_email))
        if duplicate:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="An account with this email already exists.",
            ) from None
        logger.exception("Failed to persist a new user during registration.")
        raise

    db.refresh(user)
    return AuthResponse(
        access_token=access_token,
        expires_in=expires_in,
        user=UserResponse.model_validate(user),
    )


@router.post("/login", response_model=AuthResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)) -> AuthResponse:
    normalized_email = str(payload.email).strip().lower()
    user = db.scalar(select(User).where(func.lower(User.email) == normalized_email))
    if user is None or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password.")
    if not user.is_active:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="This account is inactive.")
    return _auth_response(user)


@router.get("/me", response_model=UserResponse)
def get_me(user: User = Depends(get_current_user)) -> UserResponse:
    return UserResponse.model_validate(user)
