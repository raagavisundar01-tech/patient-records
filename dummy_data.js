const mongoose = require('./db');
const Patient = require('./models/patient');
const Record = require('./models/record');
require('dotenv').config();

const insertDummyData = async () => {
  try {
    // Clear existing data
    await Record.deleteMany({});
    await Patient.deleteMany({});

    // Insert dummy patients
    const patients = [
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        date_of_birth: new Date('1980-01-01'),
        address: '123 Main St, Anytown, USA',
        role: 'patient',
        password: 'password123',
      },
      {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '098-765-4321',
        date_of_birth: new Date('1975-05-15'),
        address: '456 Oak Ave, Somewhere, USA',
        role: 'patient',
        password: 'password123',
      },
      {
        name: 'Dr. Emily Johnson',
        email: 'emily.johnson@hospital.com',
        phone: '555-123-4567',
        date_of_birth: new Date('1970-03-20'),
        address: '789 Pine Rd, City, USA',
        role: 'doctor',
        password: 'password123',
      },
    ];

    const insertedPatients = await Patient.insertMany(patients);
    console.log('Dummy patients inserted:', insertedPatients.length);

    // Insert dummy records
    const records = [
      {
        patient_id: insertedPatients[0]._id,
        doctor_id: insertedPatients[2]._id,
        diagnosis: 'Common Cold',
        treatment: 'Rest and fluids',
        notes: 'Patient advised to rest at home.',
        record_date: new Date('2023-10-01'),
      },
      {
        patient_id: insertedPatients[1]._id,
        doctor_id: insertedPatients[2]._id,
        diagnosis: 'Hypertension',
        treatment: 'Medication and lifestyle changes',
        notes: 'Blood pressure monitoring recommended.',
        record_date: new Date('2023-09-15'),
      },
      {
        patient_id: insertedPatients[0]._id,
        doctor_id: insertedPatients[2]._id,
        diagnosis: 'Follow-up Cold',
        treatment: 'Continue rest',
        notes: 'Symptoms improving.',
        record_date: new Date('2023-10-05'),
      },
    ];

    const insertedRecords = await Record.insertMany(records);
    console.log('Dummy records inserted:', insertedRecords.length);

    console.log('Dummy data insertion completed successfully');
  } catch (error) {
    console.error('Error inserting dummy data:', error);
  } finally {
    mongoose.connection.close();
  }
};

insertDummyData();
