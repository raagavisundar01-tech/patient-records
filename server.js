const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const Patient = require('./models/patient');
require('dotenv').config();
require('./db'); // Connect to MongoDB

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const validPassword = await patient.comparePassword(password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: patient._id, role: patient.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, role: patient.role, id: patient._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Routes
const patientRoutes = require('./routes/patients');
const recordRoutes = require('./routes/records');

app.use('/api/patients', patientRoutes);
app.use('/api/records', recordRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Patient Records API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
