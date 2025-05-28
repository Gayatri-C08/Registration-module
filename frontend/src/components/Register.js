import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

function Register({ navigate }) {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/register', form);
      alert('Registered successfully');
      navigate('/login');
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <div className="form-container">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input name="firstName" placeholder="First Name" onChange={handleChange} required />
        <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Register</button>
        <p onClick={() => navigate('/login')} className="form-link">Already have an account? Login</p>
      </form>
    </div>
  );
}

export default Register;
