import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "./styles/SignUp.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
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
      const errorMsg =
        err.response?.data?.message || "Signup failed. Try again.";
      console.log(err);

      const newErrors = {};

      if (errorMsg.toLowerCase().includes("email already exists")) {
        newErrors.email = "This email is already registered.";
        // Keeping the input clearing behavior as requested in previous turn
        setName("");
        setEmail("");
        setPassword("");
      } else if (errorMsg.toLowerCase().includes("invalid email")) {
        newErrors.email = "Please enter a valid email.";
      } else {
        // Fallback - maybe generic error or map to a field if possible
        // For now, let's put it under name or generic 'form' error?
        // User requested no global errors. Let's map strict failures to fields.
        // If it's a general generic error, maybe attach to email if unknown.
        newErrors.email = errorMsg;
      }

      setErrors(newErrors);
    }
  };

  const isValid = name.length > 0 && email.length > 0 && password.length > 0;

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>

        <label className="auth-label">Full Name</label>
        <input
          className="auth-input"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setErrors({ ...errors, name: "" });
          }}
          placeholder="John Doe"
        />
        {errors.name && <span className="field-error">{errors.name}</span>}

        <label className="auth-label">Email</label>
        <input
          className="auth-input"
          type="email"
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
          className="auth-input"
          type="password"
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

        <button className="auth-btn" onClick={handleSignup} disabled={!isValid}>
          Sign Up
        </button>
      </div>
    </div>
  );
}
