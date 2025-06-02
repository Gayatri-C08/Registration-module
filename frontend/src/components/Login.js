import React, {useState} from "react";
import axios from "axios";
import './styles.css';

function Login({ navigate }) {
  const [credentials, setcredentials] = useState({ email: '', password: '' });

  const handleChange = e => setcredentials({...credentials, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', credentials);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch {
      alert('Invaild credentials');
    }
  };

  return (
    <div className="form-container">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="Submit">Login</button>
        <p onClick={() => navigate('/register')} className="form-link">Don't have an account? Register</p>
      </form>
    </div>
  );
}

export default Login;