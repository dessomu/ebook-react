import React, { useState } from "react";
import API, { setAuthToken } from "../services/api";
import { useNavigate } from "react-router-dom";
import "./styles/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("name", user.name);

      setAuthToken(token);

      navigate("/");
    } catch (err) {
      alert("Invalid credentials", err);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>

        <label className="auth-label">Email</label>
        <input
          type="email"
          className="auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />

        <label className="auth-label">Password</label>
        <input
          type="password"
          className="auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
        />

        <button className="auth-btn" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}
