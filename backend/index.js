// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
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
