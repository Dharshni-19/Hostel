import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation
import './Login.css'; // Import CSS for styling

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userRole', response.data.role);
            alert(`Logged in as ${response.data.role}`);
             
            // Navigate based on role
            if (response.data.role === 'admin') {
                navigate('/admin'); // Admin dashboard
            } else {
                navigate('/dashboard/book-room'); // Student dashboard
            }
        } catch (error) {
            console.error(error);
            alert('Login failed! Please check your credentials.');
        }
    };

    return (
        <div className="login-container">
            <h1>Hostel Management System</h1>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
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
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
};

export default Login;