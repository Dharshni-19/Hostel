// backend/models/Room.js
const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    roomNumber: {
        type: String,
        required: true,
    },
    seater: {
        type: Number,
        required: true,
    },
    fees: {
        type: Number,
        required: true,
    },
    foodOption: {
        type: Boolean,
        default: false,
    },
    stayFrom: {
        type: Date,
        required: true,
    },
    duration    : {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Room', RoomSchema);
