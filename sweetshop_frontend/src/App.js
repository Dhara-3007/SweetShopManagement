import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import SweetList from './components/SweetList';
import OrderHistory from './components/OrderHistory';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('access_token'));

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    setLoggedIn(false);
  };

  return (
    <Router>
      <div>
        <ToastContainer />
        <Navbar onLogout={handleLogout} />

        <Routes>
          <Route path="/" element={<SweetList />} />
          <Route path="/orders" element={loggedIn ? <OrderHistory /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login onLoginSuccess={() => setLoggedIn(true)} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
