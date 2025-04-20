import React, { useState } from "react";
import "../styles/AuthPage.css";


const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and register
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "", // Only used for registration
  });

  // Handle form changes (login or register)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission (login or register)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Login logic
      console.log("Logging in with:", formData);
      // Implement login API call here
    } else {
      // Registration logic
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
      } else {
        console.log("Registering with:", formData);
        // Implement registration API call here
      }
    }
  };

  return (
    <div className="auth-container">
      <h1>{isLogin ? "Login" : "Register"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {!isLogin && (
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <button type="submit" className="auth-btn">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <div className="switch-link">
        <p>
          {isLogin
            ? "Don't have an account? "
            : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Switch to Register" : "Switch to Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
