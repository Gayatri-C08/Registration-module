import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';

function Dashboard({ navigate }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');
    axios.get('http://localhost:5000/user', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setUser(res.data)).catch(() => navigate('/login'));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome to the Dashboard</h2>
      {user && (
        <div className="user-card">
          <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
