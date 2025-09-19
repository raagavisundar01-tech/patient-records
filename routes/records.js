const express = require('express');
const router = express.Router();
const Record = require('../models/record');
const authenticateToken = require('../middleware/auth');
const authorizeRole = require('../middleware/role');

// GET /records - Get all records (doctor only)
router.get('/', authenticateToken, authorizeRole(['doctor']), async (req, res) => {
  try {
    const records = await Record.find().populate('patient_id', 'name email').populate('doctor_id', 'name email');
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /records/:id - Get record by ID (doctor or patient owner)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const record = await Record.findById(req.params.id).populate('patient_id', 'name email').populate('doctor_id', 'name email');
    if (!record) return res.status(404).json({ message: 'Record not found' });
    if (req.user.role !== 'doctor' && req.user._id.toString() !== record.patient_id._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }
    res.json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /records/patient/:patientId - Get records by patient ID (doctor or patient owner)
router.get('/patient/:patientId', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'doctor' && req.user._id.toString() !== req.params.patientId) {
      return res.status(403).json({ message: 'Access denied' });
    }
    const records = await Record.find({ patient_id: req.params.patientId }).populate('patient_id', 'name email').populate('doctor_id', 'name email');
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /records - Create new record (doctor only)
router.post('/', authenticateToken, authorizeRole(['doctor']), async (req, res) => {
  try {
    const record = new Record(req.body);
    const savedRecord = await record.save();
    await savedRecord.populate('patient_id', 'name email').populate('doctor_id', 'name email').execPopulate();
    res.status(201).json(savedRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /records/:id - Update record (doctor only)
router.put('/:id', authenticateToken, authorizeRole(['doctor']), async (req, res) => {
  try {
    const record = await Record.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('patient_id', 'name email').populate('doctor_id', 'name email');
    if (!record) return res.status(404).json({ message: 'Record not found' });
    res.json(record);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /records/:id - Delete record (doctor only)
router.delete('/:id', authenticateToken, authorizeRole(['doctor']), async (req, res) => {
  try {
    await Record.findByIdAndDelete(req.params.id);
    res.json({ message: 'Record deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
