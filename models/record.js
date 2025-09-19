const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  diagnosis: String,
  treatment: String,
  notes: String,
  record_date: { type: Date, default: Date.now },
}, { timestamps: true });

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;
