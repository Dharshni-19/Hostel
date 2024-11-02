// frontend/src/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/'); // Redirect to login on logout
    };

    return (
        <nav className="navbar">
            <h1 className="navbar-title">Student Dashboard</h1>
            <ul className="navbar-menu">
                <li><Link to="/dashboard/book-room">Book Room</Link></li>
                <li><Link to="/dashboard/room-details">Room Details</Link></li>
                <li><Link to="/dashboard/complaint-registration">Complaint Registration</Link></li>
                <li><Link to="/dashboard/complaint-details">Complaint Details</Link></li>
                <li><button className="logout-button" onClick={handleLogout}>Logout</button></li>
            </ul>
        </nav>
    );
};

export default Navbar;