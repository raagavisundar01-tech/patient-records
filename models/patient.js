const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  date_of_birth: Date,
  address: String,
  role: { type: String, enum: ['patient', 'doctor'], default: 'patient' },
  password: { type: String, required: true },
}, { timestamps: true });

// Hash password before saving
patientSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password
patientSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
