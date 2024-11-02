// backend/routes/complaints.js
const express = require('express');
const Complaint = require('../models/Complaint');
const router = express.Router();

// Register a complaint
router.post('/', async (req, res) => {
    const { hostelRoomNumber, name, issue } = req.body;

    try {
        const newComplaint = new Complaint({ hostelRoomNumber, name, issue });
        await newComplaint.save();
        res.status(201).json({ message: 'Complaint registered successfully', complaint: newComplaint });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all complaints (for admin)
router.get('/', async (req, res) => {
    try {
        const complaints = await Complaint.find();
        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update complaint status
router.patch('/:id', async (req, res) => {
    const { status } = req.body;
    try {
        const complaint = await Complaint.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }
        res.status(200).json({ message: 'Complaint status updated', complaint });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
