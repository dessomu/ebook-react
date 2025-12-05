import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/NavBar.css";

export default function NavBar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="nav-container">
      <div className="nav-left">
        <span className="nav-logo">🦉 ReadOwl</span>

        <Link className="nav-link" to="/">
          Home
        </Link>

        {role === "admin" && (
          <>
            <Link className="nav-link" to="/admin/dashboard">
              Dashboard
            </Link>
            <Link className="nav-link" to="/admin/upload">
              Upload
            </Link>
            <Link className="nav-link" to="/admin/sales">
              Sales
            </Link>
          </>
        )}

        {token && role === "user" && (
          <Link className="nav-link" to="/library">
            My Library
          </Link>
        )}
      </div>

      <div className="nav-right">
        {!token ? (
          <>
            <Link className="nav-btn-outline" to="/login">
              Login
            </Link>
            <Link className="nav-btn" to="/signup">
              Sign Up
            </Link>
          </>
        ) : (
          <button className="nav-btn" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
