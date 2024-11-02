import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookRoom.css';

const BookRoom = () => {
    const [roomNumber, setRoomNumber] = useState('');
    const [seater, setSeater] = useState('');
    const [feesPerMonth, setFeesPerMonth] = useState(0);
    const [foodOption, setFoodOption] = useState(false); // Updated to boolean
    const [stayFrom, setStayFrom] = useState('');
    const [duration, setDuration] = useState('');
    const [rooms, setRooms] = useState([]);

    // Fetch list of rooms
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/rooms');
                setRooms(response.data);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };
        fetchRooms();
    }, []);

    // Fetch room details when room number changes
    useEffect(() => {
        if (roomNumber) {
            const selectedRoom = rooms.find(room => room.roomNumber === roomNumber);
            if (selectedRoom) {
                setSeater(selectedRoom.seater);
                setFeesPerMonth(selectedRoom.fees);
            }
        }
    }, [roomNumber, rooms]);

    const handleBooking = async (e) => {
        e.preventDefault();
        const totalFees = foodOption ? feesPerMonth + 1000 : feesPerMonth; // Calculate total fees

        try {
            await axios.post('http://localhost:5000/api/rooms/book', {
                roomNumber,
                seater,
                fees: totalFees,
                foodOption, // boolean value
                stayFrom,
                duration
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            alert('Room booked successfully!');
        } catch (error) {
            console.error('Booking error:', error);
            alert('Failed to book room!');
        }
    };

    return (
        <div className="book-room-container">
            <h2>Book a Room</h2>
            <form onSubmit={handleBooking}>
                <label htmlFor="roomNumber">Room Number</label>
                <select
                    id="roomNumber"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    required
                >
                    <option value="">Select a room</option>
                    {rooms.map((room) => (
                        <option key={room._id} value={room.roomNumber}>
                            {room.roomNumber}
                        </option>
                    ))}
                </select>

                <label htmlFor="seater">Seater</label>
                <input
                    type="text"
                    id="seater"
                    value={seater}
                    readOnly
                />

                <label htmlFor="feesPerMonth">Fees per Month</label>
                <input
                    type="text"
                    id="feesPerMonth"
                    value={feesPerMonth}
                    readOnly
                />

                <div className="food-status">
                    <label>
                        <input
                            type="radio"
                            name="foodOption"
                            value={false}
                            checked={!foodOption}
                            onChange={() => setFoodOption(false)}
                        />
                        Without Food
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="foodOption"
                            value={true}
                            checked={foodOption}
                            onChange={() => setFoodOption(true)}
                        />
                        With Food (+1000)
                    </label>
                </div>

                <label htmlFor="stayFrom">Stay From</label>
                <input
                    type="date"
                    id="stayFrom"
                    value={stayFrom}
                    onChange={(e) => setStayFrom(e.target.value)}
                    required
                />

                <label htmlFor="duration">Duration (Months)</label>
                <input
                    type="number"
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required
                />

                <button type="submit">Book Room</button>
            </form>
        </div>
    );
};

export default BookRoom;