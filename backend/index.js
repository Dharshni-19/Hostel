// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const allowedOrigins = ['https://hostel-1-uriu.onrender.com', 'https://famous-caramel-6e3443.netlify.app/'];

// Set up CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // Check if the origin is in the allowed list
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // Required if you’re using cookies or authorization headers
}));

// Handle preflight requests for all routes
app.options('*', cors());

app.use(bodyParser.json());

const authRoutes = require('./routes/auth');
const roomRoutes = require('./routes/rooms'); 
const issueRoutes = require('./routes/complaints'); 

app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes); 
app.use('/api/complaints', issueRoutes);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

