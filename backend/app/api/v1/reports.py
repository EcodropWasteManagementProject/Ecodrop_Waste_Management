from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.dependencies import require_roles
from app.db.session import get_db
from app.models import ReportStatus, RoleEnum, User, WasteReport
from app.schemas.reports import WasteReportCreate, WasteReportResponse

router = APIRouter(prefix="/reports", tags=["reports"])
current_citizen = Depends(require_roles(RoleEnum.CITIZEN))


def _report_response(report: WasteReport) -> WasteReportResponse:
    return WasteReportResponse(
        id=report.id,
        title=report.title,
        description=report.description,
        waste_type=report.category,
        location=report.location,
        priority=report.priority,
        status=report.status,
        assigned_vendor=report.assigned_vendor.full_name if report.assigned_vendor else None,
        created_at=report.created_at,
        updated_at=report.updated_at,
    )


@router.post("", response_model=WasteReportResponse, status_code=status.HTTP_201_CREATED)
def create_report(
    payload: WasteReportCreate,
    db: Session = Depends(get_db),
    citizen: User = current_citizen,
) -> WasteReportResponse:
    report = WasteReport(
        title=payload.title,
        description=payload.description,
        category=payload.waste_type,
        location=payload.location,
        priority=payload.priority,
        status=ReportStatus.PENDING,
        citizen_id=citizen.id,
    )
    db.add(report)
    db.commit()
    db.refresh(report)
    return _report_response(report)


@router.get("", response_model=list[WasteReportResponse])
@router.get("/my", response_model=list[WasteReportResponse], include_in_schema=False)
def list_my_reports(
    db: Session = Depends(get_db),
    citizen: User = current_citizen,
) -> list[WasteReportResponse]:
    reports = db.scalars(
        select(WasteReport)
        .where(WasteReport.citizen_id == citizen.id)
        .order_by(WasteReport.created_at.desc(), WasteReport.id.desc())
    ).all()
    return [_report_response(report) for report in reports]


@router.get("/{report_id}", response_model=WasteReportResponse)
def get_report(
    report_id: int,
    db: Session = Depends(get_db),
    citizen: User = current_citizen,
) -> WasteReportResponse:
    report = db.scalar(
        select(WasteReport).where(
            WasteReport.id == report_id,
            WasteReport.citizen_id == citizen.id,
        )
    )
    if report is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Report not found.")
    return _report_response(report)
