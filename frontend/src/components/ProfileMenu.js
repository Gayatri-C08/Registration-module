import React from "react";
import "./styles.css";

const ProfileMenu = ({ user }) => (
    <div className="profile-dropdown">
        <p><strong>Email:</strong> {user.email}</p>
        <button>Edit Into</button>
        <button>Add More Info</button>
        <button className="logout">Logout</button>
    </div>
);

export default ProfileMenu;