import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from './logo.png';

function Navbar({ onLogout }) {
  const accessToken = localStorage.getItem('access_token');
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/sweetlist" className="navbar-logo">
        <img src={logo} alt="Mithai Logo" className="logo-img" />
        <h2>शाही मिठाई</h2>
      </Link>

      <div className="navbar-right">
        {accessToken ? (
          <>
            <span className="navbar-user">Hi, {username}!</span>
            <Link to="/orders" className="navbar-link">Orders</Link>
            <button onClick={handleLogout} className="navbar-logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <span className="navbar-user">Welcome, Guest!</span>
            <Link to="/login" className="navbar-link">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
