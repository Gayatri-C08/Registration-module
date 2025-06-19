import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!storedUser) {
      navigate("/login");
    }
  }, [storedUser, navigate]);

  const [profile, setProfile] = useState(storedUser || {});
  const [activeTab, setActiveTab] = useState("profile");
  const [editSettings, setEditSettings] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [notification, setNotification] = useState("Email");
  const [theme, setTheme] = useState("Light");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    if (storedUser) {
      fetchUsers();
    }
  }, [storedUser]);

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

  const handleProfileChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
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
              <div><strong>Name:</strong> {profile.name || "N/A"}</div>
              <div><strong>Email:</strong> {profile.email || "N/A"}</div>
              <div><strong>Phone:</strong> {profile.phone || "N/A"}</div>
              <div><strong>Gender:</strong> {profile.gender || "N/A"}</div>
              <div><strong>Date of Birth:</strong> {profile.dob || "N/A"}</div>
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="glass-card">
            <div className="card-header">
              <h3>⚙️ Settings</h3>
              <button onClick={() => {
                setEditSettings(!editSettings);
                if (editSettings) {
                  localStorage.setItem("user", JSON.stringify(profile));
                }
              }}>
                {editSettings ? "Save" : "Edit"}
              </button>
            </div>

            <div className="settings-section">
              <label>Upload Profile Photo:</label>
              <input type="file" accept="image/*" onChange={handlePhotoUpload} />
              {photo && <img src={photo} alt="Profile" className="preview-img" />}

              {editSettings ? (
                <div className="settings-form">
                  <label>Name:</label>
                  <input value={profile.name || ""} onChange={(e) => handleProfileChange("name", e.target.value)} />

                  <label>Email:</label>
                  <input value={profile.email || ""} onChange={(e) => handleProfileChange("email", e.target.value)} />

                  <label>Phone:</label>
                  <input value={profile.phone || ""} onChange={(e) => handleProfileChange("phone", e.target.value)} />

                  <label>Gender:</label>
                  <select value={profile.gender || ""} onChange={(e) => handleProfileChange("gender", e.target.value)}>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>

                  <label>Date of Birth:</label>
                  <input type="date" value={profile.dob || ""} onChange={(e) => handleProfileChange("dob", e.target.value)} />

                  <label>Notification:</label>
                  <select value={notification} onChange={(e) => setNotification(e.target.value)}>
                    <option>Email</option>
                    <option>SMS</option>
                    <option>Push</option>
                  </select>

                  <label>Theme:</label>
                  <input value={theme} onChange={(e) => setTheme(e.target.value)} />
                </div>
              ) : (
                <div className="settings-form">
                  <p><strong>Name:</strong> {profile.name}</p>
                  <p><strong>Email:</strong> {profile.email}</p>
                  <p><strong>Phone:</strong> {profile.phone}</p>
                  <p><strong>Gender:</strong> {profile.gender}</p>
                  <p><strong>Date of Birth:</strong> {profile.dob}</p>
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
          <p style={{ marginTop: "10px" }}>{profile.name || "Guest"}</p>
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
              <div key={user._id || idx} className="user-card">
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