const express = require('express');
const router = express.Router();

const Room = require('../models/Room');
const authMiddleware = require('./auth');
// Seed default room data
router.post('/seed', authMiddleware, async (req, res) => {
    const defaultRooms = [
        { roomNumber: '320', seater: 3, fees: 5000, foodOption: false, stayFrom: '2024-01-01', duration: 1 },
        { roomNumber: '515', seater: 2, fees: 7000, foodOption: true, stayFrom: '2024-01-02', duration: 2 },
        { roomNumber: '245', seater: 1, fees: 8000, foodOption: true, stayFrom: '2024-01-03', duration: 1 },
        { roomNumber: '154', seater: 4, fees: 4500, foodOption: false, stayFrom: '2024-01-04', duration: 3 },
        { roomNumber: '412', seater: 3, fees: 6000, foodOption: false, stayFrom: '2024-01-05', duration: 2 },
    ];

    try {
        await Room.deleteMany(); // Clear existing data
        await Room.insertMany(defaultRooms);
        res.status(201).json({ message: 'Default rooms seeded successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Create a new room

router.post('/book', authMiddleware, async (req, res) => {
    const { roomNumber, seater, foodOption, stayFrom, duration } = req.body;

    try {
        // Check if the room exists
        const room = await Room.findOne({ roomNumber });

        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        // Check if the room can be booked based on the seater count
        const bookingsCount = await Room.countDocuments({ roomNumber }); // Count current bookings for this room

        if (bookingsCount >= room.seater) {
            return res.status(400).json({ message: 'Room fully booked, cannot accept more bookings' });
        }

        // Create a booking (you might want to create a separate Booking model for this)
        const bookingDetails = {
            roomNumber,
            seater: room.seater, // or you might want to track how many seats were booked
            fees: foodOption === 'with_food' ? room.fees + 1000 : room.fees,
            foodOption,
            stayFrom,
            duration
        };
        // Assuming you have a separate Booking model to store bookings
        const newBooking = new Room(bookingDetails);
        await newBooking.save();

        res.status(201).json({ message: 'Room booked successfully', booking: newBooking });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all rooms
router.get('/', async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;
