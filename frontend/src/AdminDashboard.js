// frontend/src/Dashboard.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar'; // Import the Navbar

const AdminDashboard = () => {
    return (
        <div>
            <AdminNavbar /> {/* Include Navbar */}
            <div style={{ paddingTop: '70px' }}> {/* Add padding to account for fixed navbar */}
                <Outlet /> {/* This will render the child routes */}
            </div>
        </div>
    );
};

export default AdminDashboard;