from __future__ import annotations

from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field, field_validator

from app.models import ReportStatus

WasteCategory = Literal[
    "Organic",
    "Plastic",
    "Paper",
    "Glass",
    "Metal",
    "Electronic",
    "Mixed",
    "Other",
]
ReportPriority = Literal["Low", "Medium", "High"]


class WasteReportCreate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    title: str = Field(min_length=1, max_length=200)
    description: str = Field(min_length=1, max_length=10000)
    waste_type: WasteCategory
    location: str = Field(min_length=1, max_length=255)
    priority: ReportPriority

    @field_validator("title", "description", "location")
    @classmethod
    def strip_required_text(cls, value: str) -> str:
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("This field cannot be blank.")
        return cleaned


class WasteReportResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    description: str
    waste_type: str
    location: str
    priority: str
    status: ReportStatus
    assigned_vendor: str | None
    created_at: datetime
    updated_at: datetime
