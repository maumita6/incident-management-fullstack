const mongoose = require('mongoose');

const IncidentSchema = new mongoose.Schema({
  incidentName: { type: String, required: true },
  commentDescription: { type: String, required: false },
  severity: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'], default: 'LOW', required: true },
  status: { type: String, enum: ['NEW', 'OPEN', 'INVESTIGATING', 'RESOLVED'], default: 'NEW' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  commentCreatedAt: { type: Date, default: Date.now }

}, { timestamps: true });

const incidents = module.exports = mongoose.model('Incident', IncidentSchema);
module.exports = incidents;
