# Mini CRM Backend

A production-ready backend system built with Node.js, PostgreSQL, and Prisma,
implementing authentication, role-based authorization, and CRM features.

---

##  Live Deployment
- **Base URL**: https://mini-crm-backend-mhhn.onrender.com
- **Swagger Docs**: https://mini-crm-backend-mhhn.onrender.com/api-docs

---

##  Tech Stack
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Swagger API Documentation
- Jest (Unit Testing)
- Docker & Docker Compose

---

## Setup Instructions (Local)

### 1. Clone the repository
```bash
git clone https://github.com/dhruv-raj23/mini-crm-backend.git
cd mini-crm-backend

2. Install dependencies
npm install

3. Configure environment variables
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/mini_crm
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
PORT=5000

4. Run Prisma migrations
npx prisma migrate dev

5. Start the server
npm run dev

Server runs at: http://localhost:5000
Swagger docs: http://localhost:5000/api-docs

Bonus Features Implemented

Customer Search Filter

GET /customers?search=abc

Unit Tests
npm test

Docker Support
docker-compose up --build

Live Deployment on Render

 API Testing (Sample curl)
Login
curl -X POST http://localhost:5000/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"admin@test.com","password":"password123"}'

Create Customer (ADMIN)
curl -X POST http://localhost:5000/customers \
-H "Authorization: Bearer <JWT_TOKEN>" \
-H "Content-Type: application/json" \
-d '{"name":"ABC Corp","email":"contact@abc.com","phone":"9999999999"}'

Get Tasks
curl -X GET http://localhost:5000/tasks \
-H "Authorization: Bearer <JWT_TOKEN>"

 Running Tests
npm test

 Docker Setup (Optional)
docker-compose up --build
