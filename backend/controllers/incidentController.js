const Incident = require('../models/Incident');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'incident_string';

exports.getAllIncidents = async (req, res) => {
    try {
        const incidents = await Incident.find().sort({ createdAt: -1 });
        res.json(incidents);
        console.log(res);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
}

exports.getIncidentById = async (req, res) => {
    try {
        const requestID = await Incident.findById(req.params.id);
        if (!requestID) {
            return res.status(404).json({ error: 'Request not found' });
        }

        Object.assign(requestID, req.body);
        console.log(req);

        await requestID.save();
        res.json(requestID);

    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.createIncident = async (req, res) => {
    try {

        /*const ID = Math.random().toString(36).substring(2, 9) + Date.now().toString(36);*/

        const newIncident = new Incident({
            incidentName: req.body.incidentName,
            severity: req.body.severity,
            commentDescription: req.body.commentDescription || '',
            status: req.body.status || 'NEW',
            commentCreatedAt: req.body.commentCreatedAt || new Date().toISOString(),
            createdAt: new Date().toISOString()
        });

        const savedIncident = await newIncident.save();

        res.status(201).json(savedIncident);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.DeleteIncidentById = async (req, res) => {
    try {
        const deletedRequest = await Incident.findByIdAndDelete(req.params.id);

        if (!deletedRequest) {
            return res.status(404).json({ error: 'Request to delete not found' });
        }
        //console.log('Request deleted successfully', res, req.params.id);
        //res.json(deletedRequest);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}