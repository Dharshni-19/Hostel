import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });

            // Debugging log
            console.log(response.data);

            if (response.data.token && response.data.role) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userRole', response.data.role);
                alert(`Logged in as ${response.data.role}`);

                if (response.data.role === 'admin') {
                    navigate('/admin/room-details');
                } else {
                    navigate('/dashboard/book-room');
                }
            } else {
                throw new Error('Invalid login response');
            }
        } catch (error) {
            console.error('Login error:', error);
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

