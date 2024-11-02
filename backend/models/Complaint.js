// backend/models/Complaint.js
const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
    hostelRoomNumber: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    issue: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'resolved', 'rejected'],
        default: 'pending', // Default status is pending
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Complaint', ComplaintSchema);
