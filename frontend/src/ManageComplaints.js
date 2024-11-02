// frontend/src/ManageComplaints.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ComplaintRegistration.css'; // Add a CSS file for styling if needed

const ManageComplaints = () => {
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/complaints');
                setComplaints(response.data);
            } catch (error) {
                console.error('Error fetching complaints:', error);
            }
        };
        fetchComplaints();
    }, []);

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await axios.patch(`http://localhost:5000/api/complaints/${id}`, { status: newStatus });
            setComplaints(complaints.map(complaint => 
                complaint._id === id ? { ...complaint, status: newStatus } : complaint
            ));
            alert('Complaint status updated successfully!');
        } catch (error) {
            console.error('Error updating complaint status:', error);
            alert('Failed to update complaint status.');
        }
    };

    return (
        <div className='tablestyle'>
            <h2>Manage Complaints</h2>
            <table>
                <thead>
                    <tr>
                        <th>Hostel Room Number</th>
                        <th>Name</th>
                        <th>Issue</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {complaints.map(complaint => (
                        <tr key={complaint._id}>
                            <td>{complaint.hostelRoomNumber}</td>
                            <td>{complaint.name}</td>
                            <td>{complaint.issue}</td>
                            <td>{complaint.status}</td>
                            <td>
                                <button className='success' onClick={() => handleStatusUpdate(complaint._id, 'resolved')}>Resolve</button>
                                <button className='reject' onClick={() => handleStatusUpdate(complaint._id, 'rejected')}>Reject</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageComplaints;