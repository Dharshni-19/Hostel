// frontend/src/StudentIssueDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ComplaintRegistration.css'; // Add a CSS file for styling if needed

const StudentIssueDetails = () => {
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/complaints'); // You can filter based on student ID if needed
                setComplaints(response.data);
            } catch (error) {
                console.error('Error fetching complaints:', error);
            }
        };
        fetchComplaints();
    }, []);

    return (
        <div className='tablestyle'>
            <h2>Your Complaints</h2>
            <table>
                <thead>
                    <tr>
                        <th>Hostel Room Number</th>
                        <th>Issue</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {complaints.map(complaint => (
                        <tr key={complaint._id}>
                            <td>{complaint.hostelRoomNumber}</td>
                            <td>{complaint.issue}</td>
                            <td>{complaint.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentIssueDetails;