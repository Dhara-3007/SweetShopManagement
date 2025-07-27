import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './SweetList.css';

function SweetCard({ sweet }) {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [quantity, setQuantity] = useState(1);
  const token = localStorage.getItem('access_token');

  const handleBuyClick = () => {
    if (!token) {
      toast.info("Please login to buy sweets.");
      navigate('/login');
      return;
    }
    setShowPopup(true);
  };

  const handlePlaceOrder = async () => {
    if (!address || !phone) {
      toast.warning("Please enter address and phone.");
      return;
    }

    try {
      await axios.post(
        'http://localhost:8000/api/auth/order/',
        {
          sweet: sweet.id,
          quantity,
          name: sweet.name,
          address,
          phone
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Order placed successfully!");
      setShowPopup(false);
      setAddress('');
      setPhone('');
    } catch (error) {
      console.error("Order error:", error.response?.data || error.message);
      toast.error("Failed to place order.");
    }
  };

  return (
    <div className="sweet-card">
      {sweet.quantity <= 5 && (
        <div className="limited-badge">Limited Stock</div>
      )}
      <img
        src={`http://localhost:8000${sweet.image}`}
        alt={sweet.name}
        className="sweet-image"
      />
      <h3 className="sweet-name">{sweet.name}</h3>
      <p className="sweet-price">Price: ₹{sweet.price}</p>
      <p className="sweet-quantity">Available: {sweet.quantity}</p>

      <button
        onClick={handleBuyClick}
        disabled={sweet.quantity === 0}
        className={`order-btn ${sweet.quantity === 0 ? 'disabled' : ''}`}
      >
        {sweet.quantity === 0 ? 'Out of Stock' : 'Buy Now'}
      </button>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h4>Enter Delivery Details</h4>
            <label>Quantity</label>
           <input
  type="number"
  min="1"
  max={sweet.quantity}
  value={quantity}
  onChange={(e) => {
    const val = e.target.value;

    // Allow empty string temporarily while typing
    if (val === '') {
      setQuantity('');
      return;
    }

    const num = Number(val);
    if (num >= 1 && num <= sweet.quantity) {
      setQuantity(num);
    }
  }}
  className="popup-input"
/>

            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="popup-input"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="popup-input"
            />
            <div className="popup-btns">
              <button onClick={handlePlaceOrder} className="confirm-btn">
                Place Order
              </button>
              <button onClick={() => setShowPopup(false)} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SweetCard;
