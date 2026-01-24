import React, { useState } from "react";
import API, { setAuthToken } from "../services/api";
import { useNavigate } from "react-router-dom";
import "./styles/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
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
      const errorMsg =
        err.response?.data?.message || "Invalid credentials. Please try again.";

      const newErrors = {};

      if (errorMsg.toLowerCase().includes("wrong password")) {
        newErrors.password = "Incorrect password.";
        setPassword("");
      } else if (errorMsg.toLowerCase().includes("user does not exist")) {
        newErrors.email = "No account found with this email.";
        setEmail("");
        setPassword("");
      } else {
        newErrors.password = errorMsg;
      }

      setErrors(newErrors);
    }
  };

  const isValid = email.length > 0 && password.length > 0;

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>

        <label className="auth-label">Email</label>
        <input
          type="email"
          className="auth-input"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors({ ...errors, email: "" });
          }}
          placeholder="you@example.com"
        />
        {errors.email && <span className="field-error">{errors.email}</span>}

        <label className="auth-label">Password</label>
        <input
          type="password"
          className="auth-input"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors({ ...errors, password: "" });
          }}
          placeholder="********"
        />
        {errors.password && (
          <span className="field-error">{errors.password}</span>
        )}

        <button className="auth-btn" onClick={handleLogin} disabled={!isValid}>
          Login
        </button>
      </div>
    </div>
  );
}
