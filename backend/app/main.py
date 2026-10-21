from __future__ import annotations

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.router import router as api_router
from app.core.config import settings
from app.db.session import check_database_connection

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger("ecodrop")


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting %s in %s mode", settings.APP_NAME, settings.APP_ENV)
    database_connected, database_message = check_database_connection()
    if database_connected:
        logger.info("Database is available: %s", database_message)
    else:
        logger.warning("Database is unavailable: %s", database_message)
    yield
    logger.info("Stopping %s", settings.APP_NAME)


app = FastAPI(
    title=settings.APP_NAME,
    version="0.1.0",
    description="EcoDrop backend foundation for future waste-management features.",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root() -> dict:
    return {
        "application": settings.APP_NAME,
        "status": "running",
        "docs": "/docs",
    }


app.include_router(api_router, prefix=settings.API_V1_PREFIX)
