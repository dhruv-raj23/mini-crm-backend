# Mini CRM Backend

## Tech Stack
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Swagger

## Setup Instructions

1. Clone the repository
2. Install dependencies
   npm install

3. Create a .env file in the project root and add:
   DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/mini_crm
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=1d
   PORT=5000


4. Run Prisma migrations
   npx prisma migrate dev

5. Start server
   npm run dev

## API Documentation
Swagger available at:
http://localhost:5000/api-docs



## API Testing (Sample curl)

### Login
```bash
curl -X POST http://localhost:5000/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"admin@test.com","password":"password123"}'

## Create Customer (ADMIN)
curl -X POST http://localhost:5000/customers \
-H "Authorization: Bearer <JWT_TOKEN>" \
-H "Content-Type: application/json" \
-d '{"name":"ABC Corp","email":"contact@abc.com","phone":"9999999999"}'

## Get Tasks
curl -X GET http://localhost:5000/tasks \
-H "Authorization: Bearer <JWT_TOKEN>"

