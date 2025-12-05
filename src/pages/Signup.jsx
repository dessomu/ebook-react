import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "./styles/SignUp.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await API.post("/auth/register", {
        email,
        password,
        name,
      });
      console.log(res);

      alert("Account created! Please log in.");
      navigate("/login");
    } catch (err) {
      alert("Signup failed");
      console.error(err);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>

        <label className="auth-label">Full Name</label>
        <input
          className="auth-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
        />

        <label className="auth-label">Email</label>
        <input
          className="auth-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />

        <label className="auth-label">Password</label>
        <input
          className="auth-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
        />

        <button className="auth-btn" onClick={handleSignup}>
          Sign Up
        </button>
      </div>
    </div>
  );
}
