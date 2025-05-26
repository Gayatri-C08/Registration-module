import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', gender: '', email:'',
    password: '' , dob: '', phone: ''
  });

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/auth/register', form);
    alert("Registered Successfully");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="firstName" placeholder="First Name" onChange={handleChange} />
      <input name="lastName" placeholder="Last Name" onChange={handleChange} />
      <input name="gender" placeholder="Gender" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <input name="dob" type="date" placeholder="Date of Birth" onChange={handleChange} />
      <input name="phone" placeholder="Phone" onChange={handleChange} />
      <button type="Submit">Register</button>
    </form>
  );
}

export default Register;