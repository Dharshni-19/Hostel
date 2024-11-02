// frontend/src/RoomDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RoomDetails.css';

const RoomDetails = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/rooms', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}` // Add token if needed
                    }
                });
                setRooms(response.data);
            } catch (error) {
                setError('Error fetching room details');
                console.error('Error fetching rooms:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="room-details-container">
            <h2>Room Details</h2>
            <table>
                <thead>
                    <tr>
                        <th>Room Number</th>
                        <th>Seater</th>
                        <th>Fees (per month)</th>
                        <th>Food Option</th>
                        <th>Stay From</th>
                        <th>Duration (months)</th>
                        {/* <th>Status</th> */}
                    </tr>
                </thead>
                <tbody>
                    {rooms.map(room => (
                        <tr key={room._id}>
                            <td>{room.roomNumber}</td>
                            <td>{room.seater}</td>
                            <td>{room.fees}</td>
                            <td>{room.foodOption ? 'Food Included' : 'Food not Included'}</td>
                            <td>{room.stayFrom ? new Date(room.stayFrom).toLocaleDateString() : 'N/A'}</td>
                            <td>{room.duration || 'N/A'}</td>
                            {/* <td>{room.isBooked ? 'Booked' : 'Available'}</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RoomDetails;