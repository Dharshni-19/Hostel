// frontend/src/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // Redirect to login on logout
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-title">Admin Dashboard</h1>
      <ul className="navbar-menu">
        <li><Link to="/admin/room-details">Hostel Details</Link></li>
        <li><Link to="/admin/issue-details">Manage Issues</Link></li>
        <li><button className="logout-button" onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;