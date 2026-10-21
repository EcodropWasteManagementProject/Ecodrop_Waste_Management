from fastapi import APIRouter

from app.api.v1.auth import router as auth_router
from app.api.v1.reports import router as reports_router
from app.core.config import settings
from app.db.session import check_database_connection

router = APIRouter(tags=["v1"])
router.include_router(auth_router)
router.include_router(reports_router)


@router.get("/health")
async def health_check() -> dict:
    database_connected, database_message = check_database_connection()
    return {
        "status": "ok",
        "app": settings.APP_NAME,
        "message": "EcoDrop API is running.",
        "database": {
            "status": "connected" if database_connected else "disconnected",
            "message": database_message,
        },
    }
