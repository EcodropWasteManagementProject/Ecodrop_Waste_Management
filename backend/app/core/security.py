from __future__ import annotations

from datetime import datetime, timedelta, timezone

import jwt
from fastapi import HTTPException, status
from pwdlib import PasswordHash

from app.core.config import settings

password_hash = PasswordHash.recommended()


def hash_password(password: str) -> str:
    return password_hash.hash(password)


def verify_password(plain_password: str, hashed_password: str | None) -> bool:
    if not hashed_password:
        return False
    return password_hash.verify(plain_password, hashed_password)


def _jwt_secret() -> str:
    secret = settings.JWT_SECRET_KEY
    if len(secret) < 32:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Authentication is not configured. Set a JWT_SECRET_KEY of at least 32 characters.",
        )
    return secret


def create_access_token(
    user_id: int,
    expires_delta: timedelta | None = None,
) -> tuple[str, int]:
    lifetime = expires_delta or timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    expires_at = datetime.now(timezone.utc) + lifetime
    payload = {
        "sub": str(user_id),
        "iat": datetime.now(timezone.utc),
        "exp": expires_at,
    }
    token = jwt.encode(payload, _jwt_secret(), algorithm="HS256")
    return token, max(0, int(lifetime.total_seconds()))


def decode_access_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, _jwt_secret(), algorithms=["HS256"])
    except jwt.ExpiredSignatureError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Access token has expired.",
            headers={"WWW-Authenticate": "Bearer"},
        ) from exc
    except jwt.InvalidTokenError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid access token.",
            headers={"WWW-Authenticate": "Bearer"},
        ) from exc

    if not isinstance(payload.get("sub"), str) or not payload["sub"].isdigit():
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid access token.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return payload
