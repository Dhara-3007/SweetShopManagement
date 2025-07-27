import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './OrderHistory.css';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/auth/orders/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching order history:', error);
        if (error.response?.status === 401) {
          localStorage.removeItem('access_token');
          navigate('/login');
        } else {
          setError('Failed to fetch order history.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]); // ✅ FIXED: included navigate in dependency array

  return (
    <div className="order-history-container">
      <h2>Your Orders</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="order-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Sweet</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>
                  <img
                    src={`http://localhost:8000${order.sweet.image}`}
                    alt={order.sweet.name}
                    className="order-img"
                  />
                </td>
                <td>{order.sweet.name}</td>
                <td>{order.quantity}</td>
                <td>₹{order.total_price}</td>
                <td>{order.address}</td>
                <td>{order.phone}</td>
                <td>{new Date(order.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderHistory;
