# Patient Records API

A Node.js/Express API for managing patient records with role-based access control.

## Features

- CRUD operations for patients and records
- Role-based access: Doctor and Patient roles
- MongoDB database hosted on Railway
- JWT authentication

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and fill in your values:
   - `MONGODB_URI`: Your Railway MongoDB connection string
   - `JWT_SECRET`: A secret key for JWT tokens
   - `PORT`: Port to run the server (default 3000)
4. Run dummy data insertion: `node dummy_data.js`
5. Start the server: `npm start` or `npm run dev`

## API Endpoints

### Patients

- `GET /api/patients` - Get all patients (Doctor only)
- `GET /api/patients/:id` - Get patient by ID (Doctor or own patient)
- `POST /api/patients` - Create new patient (Doctor only)
- `PUT /api/patients/:id` - Update patient (Doctor or own patient)
- `DELETE /api/patients/:id` - Delete patient (Doctor only)

### Records

- `GET /api/records` - Get all records (Doctor only)
- `GET /api/records/:id` - Get record by ID (Doctor or patient owner)
- `GET /api/records/patient/:patientId` - Get records by patient ID (Doctor or patient owner)
- `POST /api/records` - Create new record (Doctor only)
- `PUT /api/records/:id` - Update record (Doctor only)
- `DELETE /api/records/:id` - Delete record (Doctor only)

## Authentication

Use JWT tokens in the Authorization header: `Bearer <token>`

## Testing

Use tools like Postman or curl to test the endpoints with dummy data.

Example:

```bash
curl -X GET http://localhost:3000/api/patients \
  -H "Authorization: Bearer <your_jwt_token>"
```

## Database Schema

- **patients**: id, name, email, phone, date_of_birth, address, role, created_at, updated_at
- **records**: id, patient_id, doctor_id, diagnosis, treatment, notes, record_date, created_at, updated_at
