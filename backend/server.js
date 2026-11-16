const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Incident = require('./models/Incident');
const Users = require('./models/User');
const userRoutes = require('./routes/userRoutes');
const incidentRoutes = require('./routes/incidentRoutes');
require('dotenv').config();

const PORT = process.env.PORT || 3003
console.log('Mongo URI:', process.env.MONGO_URI);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbURI = process.env.MONGO_URI;

// Use the imported routes
app.use('/api/users', userRoutes);
app.use('/api/incidents', incidentRoutes);


const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log("Successfully connected to MongoDB!");
  } catch (err) {
    console.error("MongoDB Connection Failed! Error details:", err.message);
    process.exit(1);
  }
};

connectDB();

app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Backend Running'
  });
});


// Endpoint : Get all requests

/*app.get('/api/incidentsMng', async (req, res) => {

  try {
    const incidents = await Incident.find().sort({ createdAt: -1 });
    res.json(incidents);
    console.log(res);
  }
  catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
})*/

// Endpoint : Get specific request

/*app.get('/api/requests/:id', async (req, res) => {
  try {

    const requestID = await Request.findById(req.params.id);

    if (!requestID) {
      return res.status(404).json({ error: 'Request not found' });
    }

    res.json(requestID);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});*/


// Endpoint : Create a request

/*app.post('/api/incidentsMng', async (req, res) => {
  try {

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
console.log(res);

  } catch (error) {
  res.status(400).json({ error: error.message });
}
});*/

/*app.put('/api/incidentsMng/:id', async (req, res) => {
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
});*/



/*app.patch('/api/requests/:id/manager-approval', async (req, res) => {
  try {

    const { decision } = req.body;

    const requestID = await Request.findById(req.params.id);

    requestID.managerApproval = decision;

    if (decision === 'APPROVED' && requestID.securityApproval === 'LOCKED') {
      requestID.securityApproval = 'PENDING';
      requestID.status = 'PENDING';
    } else {
      requestID.securityApproval = 'LOCKED';
      requestID.status = 'REJECTED';
    }

    if (!requestID) {
      return res.status(404).json({ error: 'Request not found' });
    }
    await requestID.save();
    res.json(requestID);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/requests/:id/security-approval', async (req, res) => {
  try {

    const { decision } = req.body;

    const requestID = await Request.findById(req.params.id);

    requestID.securityApproval = decision;

    if (decision === 'APPROVED') {
      requestID.status = 'APPROVED';
    } else {
      requestID.status = 'REJECTED';
      // requestID.securityApproval = 'LOCKED';
    }

    if (!requestID) {
      return res.status(404).json({ error: 'Request not found' });
    }

    await requestID.save();
    res.json(requestID);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});*/

/*app.delete('/api/incidentsMng/:id', async (req, res) => {
  try {
    const deletedRequest = await Incident.findByIdAndDelete(req.params.id);

    if (!deletedRequest) {
      return res.status(404).json({ error: 'Request to delete not found' });
    }
    console.log('Request deleted successfully', res, req.params.id);
    //res.json(deletedRequest);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});*/


// Only listen to a port if running locally
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 6000;
  app.listen(PORT, () => {
    console.log(`Server running locally on port ${PORT}`);
  });
}


// Crucial for Vercel to pick up your server routing
module.exports = app; 
