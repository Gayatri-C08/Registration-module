// LoginPage.jsx
import './LoginPage.css';

export default function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form className="login-form">
          <input type="email" placeholder="Email" className="login-input" />
          <input type="password" placeholder="Password" className="login-input" />
          <button type="submit" className="login-button">Login</button>
        </form>
        <p className="register-text">
          New user? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}
