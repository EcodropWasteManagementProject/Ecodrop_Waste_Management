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

## Authentication API (Phase 6)

After applying migrations and configuring `JWT_SECRET_KEY`, the following
endpoints are available:

| Method | Path | Purpose |
| --- | --- | --- |
| `POST` | `/api/v1/auth/register` | Create a citizen account and return a bearer token |
| `POST` | `/api/v1/auth/login` | Verify email/password and return a bearer token |
| `GET` | `/api/v1/auth/me` | Return the current user; requires `Authorization: Bearer <token>` |

Public registration always creates a citizen. Vendor and admin accounts cannot
be selected through registration. Passwords are stored as Argon2 hashes; login
errors do not reveal whether an email address exists.

The React development server reads `VITE_API_BASE_URL` from
`frontend/.env.local` (see `frontend/.env.example`). The frontend stores its
access token in `sessionStorage`, so it is cleared when that browser tab's
session ends. JavaScript running on the page can access this token; this
trade-off is suitable only for this development-stage client and requires
additional security review before production.

## Citizen waste-report API (Phase 7)

All report endpoints require a valid bearer token for an active citizen. The
backend gets the report owner from that authenticated account; clients cannot
choose an owner, status, or assigned vendor. List and detail queries are scoped
to the signed-in citizen.

| Method | Path | Purpose |
| --- | --- | --- |
| `POST` | `/api/v1/reports` | Create a report with initial `PENDING` status |
| `GET` | `/api/v1/reports` | List the signed-in citizen's reports |
| `GET` | `/api/v1/reports/my` | Compatibility alias for the citizen report list |
| `GET` | `/api/v1/reports/{report_id}` | Retrieve an owned report or return 404 |

Waste types are `Organic`, `Plastic`, `Paper`, `Glass`, `Metal`, `Electronic`,
`Mixed`, and `Other`; priorities are `Low`, `Medium`, and `High`. The report
record stores title, description, category, location, status, priority,
assignment, owner, and timestamps. The current model has no image storage:
selected photos are preview-only in the browser and are not uploaded or saved.
Status history is also not recorded; the API exposes the current status and
timestamps.

The automated report tests use a temporary SQLite database for isolated API
and ownership tests. The configured PostgreSQL database must be tested separately
for integration verification.

## Run tests

```bash
pytest -q
```

## Run migrations

Apply the migrations after configuring a reachable PostgreSQL database:

```bash
alembic upgrade head
```

This creates the base tables for:

- users
- waste_reports
- pickup_requests
- notifications
- eco_points
- ai_conversations
- ai_messages
- and the authentication credential column/index

## Phase 5 model note

The schema includes users, waste reports, pickup requests, notifications, eco
points, AI conversations, and AI messages. The latest migration corrects legacy
status names and model/schema differences while preserving existing records.
Legacy pickups without the newly required waste type or quantity are backfilled
as `Other` and `Unspecified`.
The alignment migration is intentionally forward-only because mapping legacy
statuses and backfilling required pickup fields cannot be safely reversed.

The schema check in the automated test suite uses a temporary SQLite database
only to verify migration/model metadata consistency. It is not a substitute for
running migrations and connectivity checks against PostgreSQL.

## Common setup errors

- `No module named fastapi` means the virtual environment has not been activated or dependencies were not installed.
- `Database connection failed` means PostgreSQL is not running or the DATABASE_URL is invalid.
- `ModuleNotFoundError: app` usually means the backend directory is not being executed from the correct location.
- Keep `.env` uncommitted. The project ignores it in Git.

## Scope note

The API currently supports health checks, authentication, and citizen report
creation/list/detail only. Pickup requests and vendor/admin report-management
operations remain later-phase work.
