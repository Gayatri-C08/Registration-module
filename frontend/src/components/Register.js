import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
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
      <input
        name="name"
        placeholder="👤 Name"
        onChange={handleChange}
        required
      />
      <input
        name="email"
        placeholder="📧 Email"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="🔒 Password"
        onChange={handleChange}
        required
      />
      <select
        name="gender"
        onChange={handleChange}
        defaultValue=""
        required
      >
        <option value="" disabled>
          🚻 Select Gender
        </option>
        <option value="Male">👦 Male</option>
        <option value="Female">👧 Female</option>
        <option value="Other">🌈 Other</option>
      </select>
      <input
        type="date"
        name="dob"
        onChange={handleChange}
        required
      />
      <button onClick={handleRegister}>Register</button>

      <p style={{ marginTop: "10px" }}>
        Already registered?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/login")}
        >
          Login here
        </span>
      </p>
    </div>
  );
};

export default Register;
