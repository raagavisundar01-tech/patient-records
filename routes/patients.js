const express = require('express');
const router = express.Router();
const Patient = require('../models/patient');
const authenticateToken = require('../middleware/auth');
const authorizeRole = require('../middleware/role');

// GET /patients - Get all patients (doctor only)
router.get('/', authenticateToken, authorizeRole(['doctor']), async (req, res) => {
  try {
    const patients = await Patient.find().select('-password');
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /patients/:id - Get patient by ID (doctor or own patient)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).select('-password');
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    if (req.user.role !== 'doctor' && req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /patients - Create new patient (doctor only)
router.post('/', authenticateToken, authorizeRole(['doctor']), async (req, res) => {
  try {
    const patient = new Patient(req.body);
    const savedPatient = await patient.save();
    res.status(201).json(savedPatient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /patients/:id - Update patient (doctor or own patient)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'doctor' && req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json(patient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /patients/:id - Delete patient (doctor only)
router.delete('/:id', authenticateToken, authorizeRole(['doctor']), async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ message: 'Patient deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
