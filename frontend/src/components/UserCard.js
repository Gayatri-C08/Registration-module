import React from "react";
import "./styles.css";

const UserCard = ({ user }) => (
    <div className="user-card">
        <img src="/avatar.png" alt="avatar" className="user-avatar" />
        <h4>{user.email}</h4>
        <p>ID: {user._id}</p>
        <button>View</button>
    </div>
);

export default UserCard;