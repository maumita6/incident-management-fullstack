const express = require('express');
const router = express.Router();
const Incident = require('../models/Incident');
const protectedRoute = require('../middleware/authMiddleware');

const { getAllIncidents, getIncidentById, createIncident, DeleteIncidentById } = require('../controllers/incidentController');

router.get('/', protectedRoute, getAllIncidents);
router.put('/:id', protectedRoute, getIncidentById);
router.post('/', protectedRoute, createIncident);
router.delete('/:id', protectedRoute, DeleteIncidentById);
module.exports = router;

