import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles.css"; // Make sure this file contains the common styles

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    dob: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/register", form);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>

      <input className="input-field" name="name" placeholder="👤 Name" onChange={handleChange} />
      <input className="input-field" name="email" placeholder="📧 Email" onChange={handleChange} />
      <input className="input-field" type="password" name="password" placeholder="🔒 Password" onChange={handleChange} />
      <input className="input-field" name="phone" placeholder="📱 Phone Number" onChange={handleChange} />

      <select className="input-field" name="gender" onChange={handleChange} defaultValue="">
        <option value="" disabled>🚻 Select Gender</option>
        <option value="Male">👦 Male</option>
        <option value="Female">👧 Female</option>
        <option value="Other">🌈 Other</option>
      </select>

      <input className="input-field" type="date" name="dob" onChange={handleChange} />

      <button className="submit-btn" onClick={handleRegister}>Register</button>

      <p>Already registered? <a href="/login">Login here</a></p>
    </div>
  );
};

export default Register;
