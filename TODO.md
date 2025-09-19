# TODO List for Patient Records Project (Refactored to MongoDB)

- [x] Update package.json: replace pg with mongoose, mongodb
- [x] Update db.js: connect to MongoDB using mongoose
- [x] Update models/patient.js: use Mongoose schema
- [x] Update models/record.js: use Mongoose schema
- [x] Update routes/patients.js: adjust for Mongoose async operations
- [x] Update routes/records.js: adjust for Mongoose async operations
- [x] Create dummy_data.js: script to insert dummy data into MongoDB
- [x] Update .env: change DATABASE_URL to MONGODB_URI
- [x] Update run-sql.js to run dummy_data.js
- [x] Remove schema.sql and dummy_data.sql
- [x] Update README.md for MongoDB setup
- [x] Install new dependencies (npm install)
- [ ] Run dummy data insertion
- [ ] Test CRUD endpoints with MongoDB
