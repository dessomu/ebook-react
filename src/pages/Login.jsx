import React, { useState } from "react";
import API from "../services/api";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "./styles/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message;

  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleBlur = (field) => {
    const newErrors = { ...errors };
    if (field === "email") {
      if (email && !validateEmail(email)) {
        newErrors.email = "Please check the email format.";
      } else {
        delete newErrors.email;
      }
    }
    setErrors(newErrors);
  };

  const handleLogin = async () => {
    const newErrors = {};
    if (!validateEmail(email))
      newErrors.email = "Please check the email format.";

    if (!password) newErrors.password = "Password is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await API.post("/auth/login", { email, password });

      const { user } = res.data;
      console.log(res.data);

      localStorage.setItem("role", user.role);
      localStorage.setItem("name", user.name);

      navigate("/");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Invalid credentials. Please try again.";

      const newErrors = {};

      if (errorMsg.toLowerCase().includes("wrong password")) {
        newErrors.password = "Incorrect password.";
        setPassword("");
        setTimeout(() => passwordRef.current?.focus(), 0);
      } else if (errorMsg.toLowerCase().includes("user does not exist")) {
        newErrors.email = "No account found with this email.";
        setEmail("");
        setPassword("");
        setTimeout(() => emailRef.current?.focus(), 0);
      } else {
        newErrors.password = errorMsg;
      }

      setErrors(newErrors);
    }
  };

  // Only check if fields are non-empty for the button
  const isValid = validateEmail(email) && password.length > 0;

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>

        <label className="auth-label">Email</label>
        <input
          ref={emailRef}
          type="email"
          className="auth-input"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            // Clear specific error on change
            const newErrors = { ...errors };
            delete newErrors.email;
            setErrors(newErrors);
          }}
          onBlur={() => handleBlur("email")}
          placeholder="you@example.com"
        />
        {errors.email && <span className="field-error">{errors.email}</span>}

        <label className="auth-label">Password</label>
        <input
          ref={passwordRef}
          type="password"
          className="auth-input"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            const newErrors = { ...errors };
            delete newErrors.password;
            setErrors(newErrors);
          }}
          // Removed onBlur={() => handleBlur("password")}
          placeholder="********"
        />
        {errors.password && (
          <span className="field-error">{errors.password}</span>
        )}

        <button className="auth-btn" onClick={handleLogin} disabled={!isValid}>
          Login
        </button>

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/signup" className="auth-link">
            Sign up
          </Link>
        </p>

        {message && <p className="success-message">{message}</p>}
      </div>
    </div>
  );
}
