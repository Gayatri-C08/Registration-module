import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Import CSS styles

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return navigate('/login');

      try {
        const res = await axios.get('http://localhost:5000/api/auth/user', {
          headers: { Authorization: token },
        });
        setUser(res.data);
      } catch (err) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!user) return <div className="loading">Loading your dashboard...</div>;

  return (
    <div className="dashboard-container">
      <div className="header">
        <h2>Welcome, {user.firstName} {user.lastName}</h2>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="card">
        <div className="info">
          <label>Email:</label>
          <span>{user.email}</span>
        </div>
        <div className="info">
          <label>Gender:</label>
          <span>{user.gender}</span>
        </div>
        <div className="info">
          <label>Date of Birth:</label>
          <span>{new Date(user.dob).toLocaleDateString()}</span>
        </div>
        <div className="info">
          <label>Phone:</label>
          <span>{user.phone}</span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;