import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    phone: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword, address, phone } = formData;

    if (!username || !email || !password || !confirmPassword || !address || !phone) {
      toast.error('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    try {
      const res = await axios.post(
        'http://127.0.0.1:8000/api/auth/register/',
        { username, email, password, address, phone },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (res.status === 201) {
        toast.success('Registration successful! Please login.');
        navigate('/login'); // ✅ redirect to login
      } else {
        toast.error('Unexpected error during registration.');
      }
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Registration failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Register</h2>
      <input type="text" placeholder="Username" name="username" value={formData.username} onChange={handleChange} required />
      <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required />
      <input type="text" placeholder="Phone" name="phone" value={formData.phone} onChange={handleChange} required />
      <input type="text" placeholder="Address" name="address" value={formData.address} onChange={handleChange} required />
      <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} required />
      <input type="password" placeholder="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
      <button type="submit">Register</button>
      <p style={{ textAlign: 'center', marginTop: '10px' }}>
        Already have an account? <a href="/login">Login</a>
      </p>
    </form>
  );
};

export default Register;
