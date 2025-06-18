import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const Dashboard = () => {
  const navigate = useNavigate();

  // 🧠 Get full user data from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!storedUser) {
      navigate("/login");
    }
  }, [storedUser, navigate]);

  // ✅ Use dynamic profile info
  const [profile] = useState(storedUser || {});
  const [activeTab, setActiveTab] = useState("profile");
  const [editSettings, setEditSettings] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [notification, setNotification] = useState("Email");
  const [theme, setTheme] = useState("Light");

  const [users] = useState([
    { name: "Rahul Sharma", email: "rahul@example.com", gender: "Male" },
    { name: "Sneha Patil", email: "sneha@example.com", gender: "Female" },
    { name: "Aman Verma", email: "aman@example.com", gender: "Male" },
  ]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="glass-card">
            <div className="card-header">
              <h3>👤 Profile Overview</h3>
            </div>
            <div className="info-grid">
              <div><strong>Name:</strong> {profile?.name || "N/A"}</div>
              <div><strong>Email:</strong> {profile?.email || "N/A"}</div>
              <div><strong>Phone:</strong> {profile?.phone || "N/A"}</div>
              <div><strong>Gender:</strong> {profile?.gender || "N/A"}</div>
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="glass-card">
            <div className="card-header">
              <h3>⚙️ Settings</h3>
              <button onClick={() => setEditSettings(!editSettings)}>
                {editSettings ? "Save" : "Edit"}
              </button>
            </div>
            <div className="settings-section">
              <label>Upload Profile Photo:</label>
              <input type="file" accept="image/*" onChange={handlePhotoUpload} />
              {photo && <img src={photo} alt="Profile" className="preview-img" />}

              {editSettings ? (
                <div className="settings-form">
                  <label>Notification:</label>
                  <select value={notification} onChange={(e) => setNotification(e.target.value)}>
                    <option>Email</option>
                    <option>SMS</option>
                    <option>Push</option>
                  </select>

                  <label>Theme:</label>
                  <input
                    type="text"
                    placeholder="e.g., Light, Dark, Blue"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                  />
                </div>
              ) : (
                <div className="settings-form">
                  <p><strong>Notification:</strong> {notification}</p>
                  <p><strong>Theme:</strong> {theme}</p>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="dashboard-layout">
      <div className="sidebar">
        <div className="avatar">
          <img src={photo || "https://i.pravatar.cc/100"} alt="avatar" />
          <p style={{ marginTop: "10px" }}>{profile?.name || "Guest"}</p>
        </div>
        <div className="nav-links">
          <p className={activeTab === "profile" ? "active-link" : ""} onClick={() => setActiveTab("profile")}>
            👤 Profile
          </p>
          <p className={activeTab === "settings" ? "active-link" : ""} onClick={() => setActiveTab("settings")}>
            ⚙️ Settings
          </p>
          <p onClick={handleLogout} className="logout-link">🚪 Logout</p>
        </div>
      </div>

      <div className="dashboard-content">
        <h2>📊 Welcome to Your Dashboard</h2>
        {renderContent()}

        <div className="glass-card">
          <h3>🧑‍🤝‍🧑 All Registered Users</h3>
          <div className="user-card-grid">
            {users.map((user, idx) => (
              <div key={idx} className="user-card">
                <img src={`https://i.pravatar.cc/100?img=${idx + 10}`} alt={user.name} />
                <h4>{user.name}</h4>
                <p>{user.email}</p>
                <p>Gender: {user.gender}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
