import React, { useState } from "react";
import "./App.css"; // For styling

const LoginPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic
    console.log("Login:", form);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="auth-button">
            Get Started
          </button>
        </form>
        <div className="auth-options">
          <a href="#">Forgot Password?</a>
          <a href="/signup">Create Account</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
