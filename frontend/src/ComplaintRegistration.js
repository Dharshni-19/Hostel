// frontend/src/ComplaintRegistration.js
import React, { useState } from 'react';
import axios from 'axios';
import './ComplaintRegistration.css'; // Add a CSS file for styling if needed

const ComplaintRegistration = () => {
    const [hostelRoomNumber, setHostelRoomNumber] = useState('');
    const [name, setName] = useState('');
    const [issue, setIssue] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/complaints', {
                hostelRoomNumber,
                name,
                issue,
            });
            setMessage('Complaint registered successfully!');
            // Reset form fields after successful registration
            setHostelRoomNumber('');
            setName('');
            setIssue('');
        } catch (error) {
            console.error('Error registering complaint:', error);
            setMessage('Failed to register complaint.');
        }
    };

    return (
        <div className="complaint-registration-container">
            <h2>Register a Complaint</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="hostelRoomNumber">Hostel Room Number</label>
                <input
                    type="text"
                    id="hostelRoomNumber"
                    value={hostelRoomNumber}
                    onChange={(e) => setHostelRoomNumber(e.target.value)}
                    required
                />

                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label htmlFor="issue">Issue</label>
                <textarea
                    id="issue"
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    required
                ></textarea>

                <button type="submit">Submit Complaint</button>
            </form>
        </div>
    );
};

export default ComplaintRegistration;