import React, { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "./styles/SignUp.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const emailRef = React.useRef(null);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (pwd) => {
    // At least 8 chars, 1 uppercase, 1 special char
    const re = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    return re.test(pwd);
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
    if (field === "password") {
      if (password && !validatePassword(password)) {
        newErrors.password = "Password needs 8+ chars, 1 upper & 1 symbol.";
      } else {
        delete newErrors.password;
      }
    }
    setErrors(newErrors);
  };

  const handleSignup = async () => {
    // Client-side validation before submit
    const newErrors = {};
    if (!validateEmail(email))
      newErrors.email = "Please check the email format.";
    if (!validatePassword(password))
      newErrors.password = "Password needs 8+ chars, 1 upper & 1 symbol.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await API.post("/auth/register", {
        email,
        password,
        name,
      });
      console.log(res);

      navigate("/login", {
        state: { message: "Account created successfully! Please login." },
      });
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
        setTimeout(() => emailRef.current?.focus(), 0);
      } else if (errorMsg.toLowerCase().includes("invalid email")) {
        newErrors.email = "Please enter a valid email.";
        setTimeout(() => emailRef.current?.focus(), 0);
      } else {
        newErrors.email = errorMsg;
      }

      setErrors(newErrors);
    }
  };

  const isValid =
    name.length > 0 && validateEmail(email) && validatePassword(password);

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
            // Clear generic error if it was set on name, though we mostly use email/pass
            const newErrors = { ...errors };
            delete newErrors.name;
            setErrors(newErrors);
          }}
          placeholder="John Doe"
        />
        {errors.name && <span className="field-error">{errors.name}</span>}

        <label className="auth-label">Email</label>
        <input
          ref={emailRef}
          className="auth-input"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
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
          className="auth-input"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            const newErrors = { ...errors };
            delete newErrors.password;
            setErrors(newErrors);
          }}
          onBlur={() => handleBlur("password")}
          placeholder="********"
        />
        {errors.password && (
          <span className="field-error">{errors.password}</span>
        )}

        <button className="auth-btn" onClick={handleSignup} disabled={!isValid}>
          Sign Up
        </button>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
