// frontend/src/ReportIssue.js
import React, { useState } from 'react';
import axios from 'axios';

const ReportIssue = () => {
    const [description, setDescription] = useState('');

    const handleReportIssue = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/issues/report', { description }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            alert('Issue reported successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to report issue!');
        }
    };

    return (
        <form onSubmit={handleReportIssue}>
            <textarea placeholder="Describe the issue" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
            <button type="submit">Report Issue</button>
        </form>
    );
};

export default ReportIssue;