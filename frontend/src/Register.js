// frontend/src/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; // Import CSS for styling
import {  Link } from 'react-router-dom'; // Import Link for navigation

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', { username, password, role });
            alert('Registration successful!');
        } catch (error) {
            console.error(error);
            alert('Registration failed!');
        }
    };

    return (
        <div className="register-container">
            <h1>Hostel Management System</h1> {/* Headline added here */}
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <select 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)}
                    required
                >
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit">Register</button>
            </form>
            <p>
                Already you have an account? <Link to="/">Sign In</Link>
            </p>
        </div>
    );
};

export default Register;