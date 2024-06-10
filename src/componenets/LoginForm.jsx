import React, { useState } from "react";
import { auth } from "../firebase";

const LoginForm = ({ toggleSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
    } catch (error) {
      alert("Login failed. Please check your email and password.");
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="mb-4 mt-5 text-center text-2xl font-bold">Login</h2>
      <form onSubmit={handleLogin} className="form">
        {/* Login form inputs */}
        <div className="form-input">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-input">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
      <p>Don't have an account? <span onClick={toggleSignUp} className="signup-link">Sign up</span></p>
    </div>
  );
};

export default LoginForm;
