const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Allow only specific origins
const allowedOrigins = [
    'http://localhost:3000', // For local frontend development
    'https://ornate-belekoy-8ea158.netlify.app', // Your Netlify deployed frontend
];

app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allow cookies to be sent if needed
}));

app.use(bodyParser.json());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const roomRoutes = require('./routes/rooms'); 
const issueRoutes = require('./routes/complaints'); 

app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes); 
app.use('/api/complaints', issueRoutes);

// Handle preflight requests
app.options('*', cors());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    connectTimeoutMS: 30000, 
    socketTimeoutMS: 30000
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
