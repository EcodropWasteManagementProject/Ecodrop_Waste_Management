# EcoDrop

## Smart Urban Waste Management & Recycling Assistant

EcoDrop is a full-stack web application for smart urban waste management and recycling assistance.

The system connects citizens, waste collection vendors, and administrators through a web platform.

---

## Main Features

### Citizen
- Register/login
- Report waste problems
- Request waste pickup
- Track reports and pickups
- Ask AI recycling questions
- Earn eco points
- Receive notifications

### Vendor
- View pickup requests
- Accept pickup work
- Update pickup status
- Track completed pickups

### Admin
- Manage users
- Manage vendors
- Manage waste reports
- Assign vendors
- Manage pickup requests
- View system analytics

---

## Technology Stack

### Frontend
- React
- JavaScript ES6+
- Tailwind CSS
- React Router

### Backend
- Python
- FastAPI
- Uvicorn
- Pydantic

### Database
- PostgreSQL
- SQLAlchemy

### AI
- Google Gemini API or OpenAI API

### Testing
- Postman
- Automated tests where appropriate

### Version Control
- Git
- GitHub

---

## Frontend Development

The frontend is developed first using mock data.

This allows the team to:
- design the UI;
- understand user flows;
- test navigation;
- test forms;
- stabilize the interface;
- prepare components before API integration.

Mock data must eventually be replaced with real FastAPI APIs.

---

## Backend Development

The backend will use:

```text
React
   ↓
FastAPI REST API
   ↓
SQLAlchemy
   ↓
PostgreSQL
```

---

## AI Architecture

The AI assistant will use:

```text
React
   ↓
FastAPI
   ↓
Gemini/OpenAI
   ↓
FastAPI
   ↓
React
```

The AI provider API key must remain on the backend.

---

## Environment Variables

Never commit secrets.

Example frontend:

```text
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

Example backend:

```text
DATABASE_URL=...
JWT_SECRET_KEY=...
AI_API_KEY=...
```

Use `.env.example` files containing placeholder values only.

---

## Local Development

Frontend commands depend on the package manager selected during setup.

Typical:

```bash
npm install
npm run dev
```

Backend:

```bash
python -m venv .venv
```

Activate the environment and install backend dependencies according to `backend/requirements.txt`.

Typical server command:

```bash
uvicorn app.main:app --reload
```
---

## Project Goal

Deliver a functional, tested, documented full-stack university project within the available project timeline.

