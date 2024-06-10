import React, { useState } from "react";
import { auth } from "../firebase";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      alert("Sign-up successful! You can now login.");
      setEmail("");
      setPassword("");
    } catch (error) {
      alert("Sign-up failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="mb-4 mt-5 text-center text-2xl font-bold">Sign Up</h2>
      <form onSubmit={handleSignUp} className="form">
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
        <div className="form-input">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
