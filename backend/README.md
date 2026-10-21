# EcoDrop Backend

This directory contains the FastAPI service, PostgreSQL/SQLAlchemy foundation,
Phase 6 authentication, and the citizen waste-report API. Pickups, vendor/admin
workflows, notifications, eco points, and AI integrations remain mock/deferred.

## Prerequisites

- Python 3.12 (the declared dependency versions are verified with this version)
- PostgreSQL server available locally or through a managed service
- A terminal with access to the repo

## Project structure

```text
backend/
├── .env.example
├── .venv/
├── alembic/
├── app/
│   ├── api/
│   │   └── v1/
│   ├── core/
│   ├── db/
│   ├── models/
│   ├── schemas/
│   ├── services/
│   └── main.py
├── README.md
├── requirements.txt
├── tests/
└── alembic.ini
```

## Create a virtual environment

PowerShell:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

macOS/Linux:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
```

## Install dependencies

```bash
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

## Configure environment variables

Copy the example file and update the values for your local PostgreSQL instance:

```bash
copy .env.example .env
```

Then replace `CHANGE_ME` and update `DATABASE_URL` to the connection URL for your local PostgreSQL database.
`ALLOWED_ORIGINS` is a comma-separated list; keep it restricted to the frontend
development origins you use.
Set `JWT_SECRET_KEY` to a private random value of at least 32 characters. For
example, from PowerShell:

```powershell
python -c "import secrets; print(secrets.token_urlsafe(48))"
```

Copy the output into your ignored `.env` file. Never commit `.env` or share the
secret. `ACCESS_TOKEN_EXPIRE_MINUTES` controls the lifetime of access tokens.

For a local PostgreSQL installation, create the development database with:

```powershell
createdb -U postgres ecodrop_dev
```

If `createdb` is not on PATH, use PostgreSQL's SQL shell and run:

```sql
CREATE DATABASE ecodrop_dev;
```

## Run the API

```bash
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

The app will be available at:

- http://127.0.0.1:8000
- http://127.0.0.1:8000/docs
- http://127.0.0.1:8000/redoc
- http://127.0.0.1:8000/api/v1/health
