# EcoDrop — Master Specification
## Smart Urban Waste Management & Recycling Assistant

Version: 1.0
Project: CSE 400 — Spring 2026
Development approach: Frontend-first, then backend integration
Primary stack: React + Tailwind CSS / FastAPI / PostgreSQL + SQLAlchemy / Gemini or OpenAI API

---

## 1. PURPOSE

EcoDrop is a web-based smart urban waste management and recycling assistant.

The system allows citizens to:
- create waste-related reports;
- request waste pickups;
- track report and pickup status;
- get recycling and disposal guidance through an AI assistant;
- view eco-friendly activity and eco points.

Vendors/collectors can:
- view pickup requests assigned/available to them;
- accept or manage pickup work;
- update pickup status.

Administrators can:
- manage users and vendors;
- manage waste reports;
- assign vendors;
- manage pickup requests;
- monitor system statistics.

This specification is the single source of truth for the coding agent.

IMPORTANT:
- Build incrementally.
- The coding agent must inspect the existing code before changing it.
- Never rewrite working code unnecessarily.
- Do not implement future modules before they are requested in the development plan.
- Keep the project runnable after every phase.
- Prefer simple, maintainable code suitable for a university project and beginner developer.
- Do not add unnecessary technologies or libraries.

---

# 2. PROJECT SCOPE

## 2.1 Mandatory features

1. Public landing page
2. Registration
3. Login/logout
4. Role-based access
5. Citizen dashboard
6. Waste issue reporting
7. Waste report list/detail/status
8. Pickup request creation
9. Pickup tracking
10. Vendor dashboard
11. Vendor pickup management
12. Admin dashboard
13. Admin user/vendor/report/pickup management
14. AI recycling assistant
15. Eco points
16. Notifications
17. Basic analytics
18. Responsive UI
19. API integration
20. Validation and error handling
21. Testing
22. Deployment-ready configuration

## 2.2 Optional features

Only implement after all mandatory features work:
- AI waste image identification
- map/location visualization
- email notifications
- advanced rewards
- advanced geographic routing

Do not allow optional features to delay the core project.

---

# 3. USER ROLES

Use exactly these application roles:

- CITIZEN
- VENDOR
- ADMIN

## CITIZEN

Can:
- register/login;
- manage profile;
- create waste reports;
- view own reports;
- update/delete eligible reports;
- create pickup requests;
- view own pickup requests;
- use AI assistant;
- view eco points;
- view notifications.

Cannot:
- access vendor pages;
- access admin pages;
- modify other users' records.

## VENDOR

Can:
- login;
- view vendor dashboard;
- view available/assigned pickup requests;
- accept eligible pickup requests;
- update pickup status;
- view own profile.

Cannot:
- access admin management;
- modify unrelated user accounts.

## ADMIN

Can:
- login;
- view system dashboard;
- manage users;
- manage vendors;
- manage reports;
- assign vendors;
- manage pickup requests;
- view analytics.

---

# 4. FRONTEND-FIRST DEVELOPMENT RULE

The project starts with the frontend.

PHASE A:
Build the complete frontend UI using mock/static data.

PHASE B:
Create the backend and database.

PHASE C:
Replace mock data with real APIs.

PHASE D:
Integrate AI.

PHASE E:
Test, polish, deploy.

The frontend must be designed so that mock data can later be replaced by API calls without rewriting the UI.

Do not put backend/database code into the frontend.

---

# 5. FRONTEND TECHNOLOGY

Use:
- React
- JavaScript (ES6+)
- Tailwind CSS
- React Router

Use a simple API service layer for future backend integration.

Avoid unnecessary state-management libraries unless the project genuinely requires them.

Use React Context for authentication state if needed.

---

# 6. FRONTEND FOLDER STRUCTURE

Target structure:

frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Select.jsx
│   │   │   ├── Textarea.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── StatusBadge.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── ErrorMessage.jsx
│   │   │   └── ConfirmDialog.jsx
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── DashboardLayout.jsx
│   │   ├── reports/
│   │   ├── pickups/
│   │   ├── ai/
│   │   └── dashboard/
│   ├── pages/
│   │   ├── public/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   └── RecyclingGuide.jsx
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── citizen/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Reports.jsx
│   │   │   ├── CreateReport.jsx
│   │   │   ├── ReportDetails.jsx
│   │   │   ├── Pickups.jsx
│   │   │   ├── CreatePickup.jsx
│   │   │   ├── PickupDetails.jsx
│   │   │   ├── AIAssistant.jsx
│   │   │   ├── EcoPoints.jsx
│   │   │   ├── Notifications.jsx
│   │   │   └── Profile.jsx
│   │   ├── vendor/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Pickups.jsx
│   │   │   ├── PickupDetails.jsx
│   │   │   └── Profile.jsx
│   │   └── admin/
│   │       ├── Dashboard.jsx
│   │       ├── Users.jsx
│   │       ├── Vendors.jsx
│   │       ├── Reports.jsx
│   │       ├── Pickups.jsx
│   │       └── Analytics.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── services/
│   │   ├── api.js
│   │   ├── authApi.js
│   │   ├── reportApi.js
│   │   ├── pickupApi.js
│   │   ├── notificationApi.js
│   │   ├── ecoPointApi.js
│   │   └── aiApi.js
│   ├── data/
│   │   └── mockData.js
│   ├── hooks/
│   ├── utils/
│   ├── routes/
│   │   └── AppRoutes.jsx
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── package.json
└── README.md

The exact component subfolders can be adjusted if the result remains clean and consistent.

---

# 7. VISUAL DESIGN DIRECTION

EcoDrop should look like a modern environmental technology platform.

Design goals:
- clean;
- simple;
- trustworthy;
- accessible;
- professional enough for a university final-year project;
- responsive on desktop, tablet and mobile.

Use a restrained environmental visual language.

Do not:
- create excessive animations;
- use huge gradients everywhere;
- overload dashboards with cards;
- use decorative UI that harms usability.

Use:
- clear navigation;
- consistent spacing;
- readable typography;
- clear buttons;
- status badges;
- cards/tables where appropriate;
- accessible form labels;
- visible validation/error states.

The design must prioritize functionality over decoration.

---

# 8. PUBLIC PAGES

## 8.1 Home

Sections:
1. Navbar
2. Hero
3. Main benefits
4. How EcoDrop works
5. Waste/recycling categories
6. AI assistant introduction
7. Eco impact/statistics section
8. Call-to-action
9. Footer

Primary CTAs:
- Report Waste
- Request Pickup
- Ask AI Assistant

Unauthenticated users attempting protected actions should be directed to login.

## 8.2 About

Explain:
- EcoDrop purpose;
- citizen-authority communication;
- responsible disposal;
- recycling assistance;
- project goals.

## 8.3 Recycling Guide

Provide simple static educational information for:
- Organic
- Plastic
- Paper
- Glass
- Metal
- Electronic
- Mixed
- Other

Do not claim universal recycling rules. Local rules may differ.

---

# 9. AUTHENTICATION UI

## Register

Fields:
- full name
- email
- password
- confirm password
- phone (optional)
- address (optional)
- role

For public registration, default role should be CITIZEN.

Vendor/admin accounts should normally be created/approved by admin in the backend.

Validation:
- required name;
- valid email;
- password requirements;
- matching passwords;
- clear errors.

## Login

Fields:
- email
- password

Show:
- loading state;
- invalid credentials error;
- successful redirect.

---

# 10. CITIZEN DASHBOARD

Layout:

Sidebar:
- Dashboard
- My Reports
- Report Waste
- My Pickups
- Request Pickup
- AI Assistant
- Eco Points
- Notifications
- Profile

Dashboard content:
- welcome message;
- total reports;
- pending reports;
- active pickups;
- completed pickups;
- eco points;
- recent reports;
- recent pickup requests;
- recent notifications.

---

# 11. WASTE REPORT UI

## Create Report

Fields:
- title
- description
- waste type
- location
- priority
- photo

Waste types:
- Organic
- Plastic
- Paper
- Glass
- Metal
- Electronic
- Mixed
- Other

Priority:
- Low
- Medium
- High

Show:
- client-side validation;
- upload preview;
- submit loading;
- success message;
- error message.

## Report list

Show:
- report ID;
- title;
- waste type;
- location;
- priority;
- status;
- created date;
- action.

## Report detail

Show:
- complete report information;
- photo;
- current status;
- assigned vendor when available;
- status timeline if possible.

Report statuses:
- PENDING
- ASSIGNED
- IN_PROGRESS
- RESOLVED
- REJECTED

---

# 12. PICKUP UI

## Create Pickup

Fields:
- waste type
- approximate quantity
- address
- preferred date
- notes

Statuses:
- PENDING
- ASSIGNED
- PICKED_UP
- COMPLETED
- CANCELLED

## Citizen pickup list

Show:
- pickup ID;
- waste type;
- address;
- preferred date;
- status;
- assigned vendor;
- action.

## Pickup detail

Show:
- request information;
- current status;
- vendor;
- status timeline;
- notes.

---

# 13. VENDOR DASHBOARD

Sidebar:
- Dashboard
- Pickup Requests
- Profile

Dashboard:
- pending pickups;
- assigned pickups;
- completed pickups;
- recent activity.

Pickup table:
- request ID;
- waste type;
- location;
- date;
- status;
- action.

Actions:
- accept;
- reject if permitted;
- mark picked up;
- mark completed.

Do not allow impossible status transitions.

---

# 14. ADMIN DASHBOARD

Sidebar:
- Dashboard
- Users
- Vendors
- Reports
- Pickups
- Analytics

Dashboard:
- total users;
- total vendors;
- total reports;
- pending reports;
- total pickups;
- completed pickups;
- waste category distribution;
- recent activity.

## Users

Admin can:
- view users;
- search/filter users;
- activate/deactivate users.

## Vendors

Admin can:
- view vendors;
- approve vendor;
- deactivate vendor;
- view vendor workload.

## Reports

Admin can:
- view reports;
- filter by status/type/priority;
- assign vendor;
- update status.

## Pickups

Admin can:
- view pickup requests;
- assign vendor;
- update status where appropriate.

## Analytics

Basic charts:
- reports by waste type;
- reports by status;
- pickups by status;
- monthly activity.

Keep analytics simple and meaningful.

---

# 15. AI ASSISTANT UI

Route:
- /citizen/ai

UI:
- conversation area;
- user messages;
- assistant messages;
- input box;
- send button;
- loading indicator;
- error state.

Initial frontend development uses mock responses.

Later API contract:

POST /api/v1/ai/chat

Request:
{
  "conversation_id": optional,
  "message": "Can I recycle this plastic bottle?"
}

Response:
{
  "conversation_id": 1,
  "message": "..."
}

AI must provide practical waste sorting/recycling guidance.

Do not expose the AI provider API key in frontend code.

---

# 16. ECO POINTS

Citizen page:
- current points;
- level;
- activity history.

Suggested activities:
- valid waste report: +10
- completed pickup: +20
- recycling activity: +10

The backend must ultimately calculate/record points. Frontend mock values are temporary only.

Do not create a complicated reward marketplace.

---

# 17. NOTIFICATIONS

Show:
- title;
- message;
- date;
- read/unread state.

Examples:
- pickup accepted;
- report resolved;
- pickup completed;
- eco points earned.

---

# 18. RESPONSIVE DESIGN

Required breakpoints:
- mobile;
- tablet;
- desktop.

Mobile:
- collapsible sidebar or mobile navigation;
- responsive tables;
- stacked forms;
- no horizontal overflow.

Desktop:
- sidebar;
- content area;
- readable max width.

Test at least:
- 360px;
- 768px;
- 1024px;
- 1366px.

---

# 19. MOCK DATA RULE

During frontend-first development, use mock data in:
src/data/mockData.js

Mock data must resemble the future API structures.

Example report:

{
  id: 1,
  title: "Overflowing waste near road",
  description: "...",
  wasteType: "Mixed",
  location: "Sylhet",
  priority: "High",
  status: "PENDING",
  createdAt: "2026-09-01"
}

Do not scatter hardcoded data throughout JSX.

Keep mock data centralized.

---

# 20. FUTURE BACKEND API CONTRACT

Base URL:
VITE_API_BASE_URL

API prefix:
 /api/v1

Authentication:
POST /auth/register
POST /auth/login
GET /auth/me

Users:
GET /users/me
PUT /users/me

Reports:
POST /reports
GET /reports/my
GET /reports/{id}
PUT /reports/{id}
DELETE /reports/{id}

Pickups:
POST /pickups
GET /pickups/my
GET /pickups/{id}

Vendor:
GET /vendor/pickups
PUT /vendor/pickups/{id}/accept
PUT /vendor/pickups/{id}/status

Admin:
GET /admin/users
GET /admin/vendors
GET /admin/reports
PUT /admin/reports/{id}/status
PUT /admin/reports/{id}/assign
GET /admin/pickups
PUT /admin/pickups/{id}/assign

Notifications:
GET /notifications
PUT /notifications/{id}/read

Eco points:
GET /eco-points
GET /eco-points/history

AI:
POST /ai/chat
GET /ai/conversations
GET /ai/conversations/{id}

The agent may refine endpoint details during backend implementation, but must preserve the overall feature contract.

---

# 21. DATABASE TARGET

Backend will use PostgreSQL + SQLAlchemy.

Core entities:
- User
- WasteReport
- PickupRequest
- Notification
- EcoPoint
- AIConversation
- AIMessage

Suggested relationships:

User 1 → many WasteReports
User 1 → many PickupRequests
User 1 → many Notifications
User 1 → many EcoPoints
User 1 → many AIConversations
AIConversation 1 → many AIMessages
Vendor/User 1 → many assigned WasteReports
Vendor/User 1 → many assigned PickupRequests

Do not create redundant tables without a clear requirement.

---

# 22. BACKEND TARGET STRUCTURE

backend/
├── app/
│   ├── main.py
│   ├── core/
│   │   ├── config.py
│   │   ├── database.py
│   │   └── security.py
│   ├── models/
│   ├── schemas/
│   ├── routers/
│   ├── services/
│   └── utils/
├── tests/
├── uploads/
├── .env
├── .env.example
├── requirements.txt
└── README.md

Keep route handlers thin and business logic in services where practical.

---

# 23. SECURITY REQUIREMENTS

- Never store plaintext passwords.
- Hash passwords.
- Use JWT authentication.
- Protect role-specific routes.
- Never expose AI API keys.
- Never commit .env secrets.
- Validate uploaded files.
- Validate all backend input.
- Enforce authorization on backend, not only frontend.
- Do not trust frontend role/status values.
- Use appropriate HTTP status codes.

---

# 24. ERROR HANDLING

Frontend must provide:
- loading state;
- empty state;
- error state;
- success feedback;
- retry where useful.

Backend should use:
200 success
201 created
400 bad request
401 unauthorized
403 forbidden
404 not found
422 validation error
500 internal server error

Never silently fail.

---

# 25. STATUS TRANSITION RULES

Waste report:

PENDING → ASSIGNED
ASSIGNED → IN_PROGRESS
IN_PROGRESS → RESOLVED

PENDING → REJECTED is allowed for admin.

Pickup:

PENDING → ASSIGNED
ASSIGNED → PICKED_UP
PICKED_UP → COMPLETED

Eligible cancellation should be clearly defined and enforced.

Do not allow arbitrary status changes from the frontend.

---

# 26. AI SAFETY/QUALITY

The AI assistant is an information helper, not an authority.

System prompt should tell the model:
- focus on waste sorting/recycling;
- provide practical concise guidance;
- do not pretend to know local rules when unknown;
- clearly state uncertainty;
- avoid dangerous disposal instructions;
- encourage appropriate local authority guidance for hazardous materials.

---

# 27. TESTING REQUIREMENTS

Frontend:
- navigation;
- forms;
- validation;
- protected pages;
- responsive layout;
- mock interactions.

Backend:
- auth;
- reports;
- pickups;
- role permissions;
- admin;
- AI endpoint;
- notifications;
- points.

API testing:
- Postman.

The final project must include a documented test plan.

---

# 28. DOCUMENTATION REQUIREMENTS

README must contain:
- project overview;
- technology stack;
- setup;
- environment variables;
- run commands;
- folder structure;
- major features;
- test instructions.

Final academic documentation should include:
- introduction;
- objectives;
- requirements;
- system analysis;
- architecture;
- database design;
- UI design;
- implementation;
- testing;
- results;
- limitations;
- future work.

---

# 29. CODING AGENT OPERATING RULES

Before every task:
1. Read this specification.
2. Read DEVELOPMENT_PLAN.md.
3. Inspect the existing repository.
4. Identify what is already implemented.
5. Determine the smallest safe change.

During every task:
1. Implement only the requested phase.
2. Reuse existing components.
3. Avoid unnecessary dependencies.
4. Keep naming consistent.
5. Keep code understandable to a beginner.
6. Do not create duplicate components.
7. Do not remove working functionality.

After every task:
1. Run the application.
2. Run relevant tests/lint/build checks.
3. Fix errors caused by the change.
4. Summarize files created/modified.
5. Explain how to run it.
6. List known issues.
7. State the next task from DEVELOPMENT_PLAN.md.

If a requirement is ambiguous:
- choose the simplest reasonable implementation;
- document the assumption;
- do not block the entire project.

Never claim a feature works unless it has been tested.

---

# 30. DEFINITION OF DONE

A feature is DONE only when:
- UI exists;
- required interaction works;
- validation exists;
- loading state exists where needed;
- error state exists;
- responsive behavior is acceptable;
- code is organized;
- existing features still work;
- relevant tests/checks pass.

For frontend-only phases, mock data is acceptable.

For integration phases, mock data must be replaced by real API calls.

---

# 31. FIRST DEVELOPMENT TASK

The project has started with frontend first.

The first coding-agent task should be:

"Set up the React + Tailwind CSS frontend foundation only.

Create the project structure, routing foundation, global styles, reusable common UI components, public layout, dashboard layout, and placeholder pages required by the route structure.

Do not implement backend, database, authentication logic, AI API, or real API calls yet.

Use mock/static data only where necessary.

Run the frontend and verify that every declared route loads without crashing."

After that, follow DEVELOPMENT_PLAN.md in order.
