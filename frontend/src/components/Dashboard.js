import React, { useEffect, useState } from "react";
import "./styles.css";

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    // Get logged-in user from localStorage
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(storedUser);

    // Fetch all users from backend
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => setAllUsers(data))
      .catch((err) => console.error(err));
  }, []);

  if (!currentUser) {
    return <div>Loading user info...</div>;
  }

  return (
    <div className="dashboard-container">
      {/* Top Nav */}
      <header className="navbar">
        <div className="logo">MyApp</div>
        <div className="profile-section" onClick={() => setShowMenu(!showMenu)}>
          <img src="/avatar.png" alt="Avatar" className="avatar" />
          {showMenu && (
            <div className="profile-menu">
              <p><strong>Email:</strong> {currentUser.email}</p>
              <p><strong>User ID:</strong> {currentUser._id}</p>
              <button>Edit Info</button>
              <button>Add More Info</button>
              <button onClick={() => {
                localStorage.removeItem("currentUser");
                window.location.href = "/login";
              }}>Logout</button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <h2>All Registered Users</h2>
        <div className="card-grid">
          {allUsers?.map((user, idx) => (
            <div key={idx} className="user-card">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>User ID:</strong> {user._id}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
