import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error('Please enter both username and password.');
      return;
    }

    try {
      const res = await axios.post(
        'http://127.0.0.1:8000/api/auth/login/',
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (res.status === 200 && res.data?.access) {
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);
        localStorage.setItem('username', username);
        toast.success('Login successful!');
        onLoginSuccess(); // update App state
        navigate('/'); // ✅ redirect to sweet list
      } else {
        toast.error('Login failed: Unexpected response.');
      }
    } catch (err) {
      toast.error('Login failed: Invalid credentials or server error.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Login</h2>
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
      <p style={{ textAlign: 'center', marginTop: '10px' }}>
        Don’t have an account? <a href="/register">Register</a>
      </p>
    </form>
  );
};

export default Login;
