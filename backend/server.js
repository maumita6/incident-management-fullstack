const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const incidentRoutes = require('./routes/incidentRoutes');
require('dotenv').config();

const app = express();

const corsOptions = {
  origin: [
    'https://incident-management-fullstack.vercel.app',
    'http://localhost:4200'  // testing Angular locally
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.options('/{*splat}', cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    isConnected = db.connections[0].readyState === 1;
    console.log('Successfully connected to MongoDB!');
  } catch (err) {
    console.error('MongoDB Connection Failed:', err.message);
  }
};

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Backend Running'
  });
});

app.use('/api/users', userRoutes);
app.use('/api/incidents', incidentRoutes);

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3003;
  app.listen(PORT, () => {
    console.log(`Server running locally on port ${PORT}`);
  });
}

module.exports = app;
