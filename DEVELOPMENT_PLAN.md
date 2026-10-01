# EcoDrop — Development Plan

This plan is designed for a beginner developer working with an AI coding agent.

IMPORTANT:
The project is intentionally FRONTEND-FIRST.

Do one phase at a time.
Do not ask the coding agent to build the whole project in one request.

---

# PHASE 0 — Understand and Prepare

Goal:
Prepare the repository and understand the specification.

Tasks:
1. Create Git repository.
2. Create main project folder.
3. Add:
   - ECODROP_MASTER_SPEC.md
   - DEVELOPMENT_PLAN.md
   - README.md
4. Read the specification.
5. Confirm development stack.
6. Decide repository structure:
   - frontend/
   - backend/
7. Create Git branches:
   - main
   - develop

Done when:
- repository exists;
- specification files exist;
- project direction is clear.

---

# PHASE 1 — FRONTEND FOUNDATION

Goal:
Create a working React frontend before backend development.

Tasks:
1. Initialize React application.
2. Configure Tailwind CSS.
3. Configure React Router.
4. Create global styles.
5. Create reusable components.
6. Create Navbar/Footer.
7. Create DashboardLayout.
8. Create Sidebar.
9. Create public pages.
10. Create auth page UI.
11. Create citizen pages.
12. Create vendor pages.
13. Create admin pages.
14. Create route configuration.
15. Create mock data.
16. Make every route load without crashing.
17. Test responsive layout.

Do NOT:
- create FastAPI;
- create PostgreSQL;
- implement real authentication;
- call AI API;
- create real API calls.

Expected result:
A navigable frontend prototype.

Git commit:
frontend: create EcoDrop UI foundation

---

# PHASE 2 — FRONTEND CORE FEATURES WITH MOCK DATA

Goal:
Make the frontend feel like a complete application before backend integration.

Tasks:
1. Citizen dashboard mock data.
2. Report creation form.
3. Report list.
4. Report details.
5. Pickup request form.
6. Pickup list/details.
7. Vendor dashboard.
8. Vendor pickup actions using local/mock state.
9. Admin dashboard.
10. Admin user/report/pickup tables.
11. AI chat UI with mock responses.
12. Eco points page.
13. Notifications.
14. Basic analytics UI.
15. Form validation.
16. Loading/empty/error states.

Expected result:
A complete frontend prototype using mock data.

Git commit:
frontend: complete mock application flows

---

# PHASE 3 — FRONTEND QUALITY PASS

Goal:
Stabilize the frontend before building backend.

Tasks:
1. Remove duplicate components.
2. Fix inconsistent styles.
3. Fix navigation.
4. Test all forms.
5. Test mobile layout.
6. Test desktop layout.
7. Test invalid inputs.
8. Add accessible labels.
9. Add confirmation dialogs where appropriate.
10. Check empty states.
11. Check loading states.
12. Run production build.

Expected result:
Stable frontend prototype.

Git commit:
frontend: stabilize and polish UI

---

# PHASE 4 — BACKEND FOUNDATION

Goal:
Create FastAPI backend and database.

Tasks:
1. Create backend directory.
2. Create Python virtual environment.
3. Install FastAPI/Uvicorn.
4. Install SQLAlchemy.
5. Configure PostgreSQL.
6. Configure environment variables.
7. Create database connection.
8. Create project architecture.
9. Add health endpoint.
10. Verify FastAPI starts.
11. Verify PostgreSQL connection.

Expected result:

React
  |
FastAPI
  |
PostgreSQL

Git commit:
backend: create FastAPI and database foundation

---

# PHASE 5 — DATABASE MODELS

Goal:
Create the core database.

Models:
1. User
2. WasteReport
3. PickupRequest
4. Notification
5. EcoPoint
6. AIConversation
7. AIMessage

Tasks:
1. Define models.
2. Define relationships.
3. Add constraints.
4. Create migrations.
5. Create seed data.
6. Create test users:
   - citizen
   - vendor
   - admin

Expected result:
Database can be initialized and populated.

Git commit:
backend: create core database models

---

# PHASE 6 — AUTHENTICATION

Goal:
Implement secure authentication.

Tasks:
1. Registration endpoint.
2. Password hashing.
3. Login endpoint.
4. JWT token.
5. Current-user endpoint.
6. Role dependency.
7. Backend authorization.
8. Test invalid login.
9. Test unauthorized access.
10. Test each role.

Then integrate frontend:
1. Login form → API.
2. Register form → API.
3. Authentication state.
4. Protected routes.
5. Role-based redirect.
6. Logout.

Expected result:
Real authentication works end-to-end.

Git commit:
auth: implement secure role-based authentication

---

# PHASE 7 — WASTE REPORTS

Backend:
1. Create report.
2. Get current user's reports.
3. Get report details.
4. Update eligible report.
5. Delete eligible report.
6. Admin report list.
7. Admin status update.
8. Admin vendor assignment.
9. Image upload.

Frontend:
1. Replace mock reports.
2. Connect create form.
3. Connect report list.
4. Connect report details.
5. Show real status.
6. Handle API errors.

Test with Postman.

Git commit:
reports: implement waste reporting workflow

---

# PHASE 8 — PICKUP REQUESTS

Backend:
1. Create pickup.
2. List user's pickups.
3. Pickup details.
4. Vendor pickup list.
5. Vendor accept.
6. Vendor status update.
7. Admin assignment.
8. Status validation.

Frontend:
1. Replace mock pickups.
2. Connect request form.
3. Connect list.
4. Connect details.
5. Vendor actions.
6. Admin actions.

Git commit:
pickups: implement pickup management workflow

---

# PHASE 9 — VENDOR DASHBOARD

Tasks:
1. Real vendor dashboard statistics.
2. Real pickup list.
3. Accept action.
4. Status update.
5. Profile.
6. Permission testing.

Git commit:
vendor: implement vendor dashboard

---

# PHASE 10 — ADMIN DASHBOARD

Tasks:
1. Real dashboard statistics.
2. Users page.
3. Vendors page.
4. Reports page.
5. Pickups page.
6. Vendor assignment.
7. Status management.
8. Filters/search.
9. Authorization tests.

Git commit:
admin: implement administration dashboard

---

# PHASE 11 — AI ASSISTANT

Backend:
1. AI service abstraction.
2. Provider configuration.
3. Environment variable for API key.
4. AI chat endpoint.
5. Conversation storage.
6. Message storage.
7. Error handling.
8. Rate/error safeguards as appropriate.

Frontend:
1. Replace mock chat.
2. Connect API.
3. Conversation state.
4. Loading state.
5. Error state.
6. Preserve conversation history.

Important:
Never expose provider API key to React.

Git commit:
ai: integrate recycling assistant

---

# PHASE 12 — ECO POINTS

Tasks:
1. Create point transaction logic.
2. Award points for valid activities.
3. Prevent duplicate/incorrect awards.
4. Create point history endpoint.
5. Connect frontend.
6. Show level/progress.

Git commit:
points: implement eco points

---

# PHASE 13 — NOTIFICATIONS

Tasks:
1. Notification model/API.
2. Generate notifications for important status changes.
3. Notification list.
4. Mark read.
5. Connect frontend.
6. Notification badge.

Git commit:
notifications: implement notification system

---

# PHASE 14 — ANALYTICS

Tasks:
1. Backend aggregate endpoints.
2. Reports by waste type.
3. Reports by status.
4. Pickup statistics.
5. Monthly activity.
6. Connect charts.

Keep analytics simple.

Git commit:
analytics: implement basic system analytics

---

# PHASE 15 — COMPLETE TESTING

Test:
1. Registration.
2. Login.
3. Logout.
4. Citizen permissions.
5. Vendor permissions.
6. Admin permissions.
7. Reports.
8. Pickups.
9. AI.
10. Notifications.
11. Points.
12. Analytics.
13. Invalid input.
14. Unauthorized requests.
15. Responsive UI.

Use Postman for API testing.

Create test documentation.

Git commit:
test: complete system testing and fixes

---

# PHASE 16 — DEPLOYMENT PREPARATION

Tasks:
1. Production environment variables.
2. Production database configuration.
3. Backend deployment.
4. Frontend deployment.
5. CORS configuration.
6. HTTPS.
7. Verify AI API configuration.
8. Production smoke test.

Git commit:
deploy: prepare production release

---

# PHASE 17 — FINAL DOCUMENTATION

Prepare:
1. SRS.
2. System architecture.
3. Use-case diagram.
4. ER diagram.
5. API documentation.
6. UI screenshots.
7. Testing report.
8. Results.
9. Limitations.
10. Future work.
11. Installation guide.
12. Final README.

Prepare:
- defense slides;
- demo flow;
- common viva questions.

---

# FEATURE PRIORITY

MUST HAVE:
- authentication;
- citizen reports;
- pickup requests;
- vendor dashboard;
- admin dashboard;
- PostgreSQL;
- FastAPI;
- React;
- AI text assistant;
- testing.

SHOULD HAVE:
- eco points;
- notifications;
- analytics.

OPTIONAL:
- AI image identification;
- maps;
- email/SMS;
- advanced rewards.

If time becomes limited:
STOP adding optional features.
Finish and test the MUST HAVE features.

---

# AI CODING AGENT WORKFLOW

For each phase, use this sequence:

1. Tell agent which phase to implement.
2. Agent reads master specification.
3. Agent inspects existing code.
4. Agent implements only that phase.
5. Agent runs tests/build.
6. Agent fixes errors.
7. Agent reports changed files.
8. User reviews.
9. Commit changes.
10. Move to next phase.

Never skip testing.

---

# BEGIN HERE

Current state:
Frontend-first.

Next task:
PHASE 1 — FRONTEND FOUNDATION.

After Phase 1:
PHASE 2 — FRONTEND CORE FEATURES WITH MOCK DATA.

Do not begin backend until Phase 3 is complete.
