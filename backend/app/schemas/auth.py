from __future__ import annotations

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator

from app.models import RoleEnum


class RegistrationRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    full_name: str = Field(min_length=2, max_length=255)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    phone: str | None = Field(default=None, max_length=40)
    address: str | None = Field(default=None, max_length=255)

    @field_validator("full_name")
    @classmethod
    def validate_full_name(cls, value: str) -> str:
        name = value.strip()
        if len(name) < 2:
            raise ValueError("Full name must contain at least 2 non-space characters.")
        return name


class LoginRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    email: EmailStr
    password: str = Field(min_length=1, max_length=128)


class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    email: EmailStr
    full_name: str
    phone: str | None
    address: str | None
    role: RoleEnum
    is_active: bool


class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int
    user: UserResponse
