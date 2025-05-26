import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   axios.get('http://localhost:5000/api/auth/dashboard', {
  //     headers: {'x-auth-token': token}
  //   })
  //   .then(res => setUser(res.data.user))
  //   .catch(() => setUser(null));
  // }, []);

  // if (!user) return <p>Access Denied. Please login.</p>

  return (
    <div>
      <h2>Welcome to Dashboard</h2>
      {/* <h2>Welcome to Dashboard {user.name}</h2>
      <p>Email: {user.email}</p> */}
    </div>
  );
};

export default Dashboard;