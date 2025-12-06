import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/NavBar.css";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
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
      {/* Left section */}
      <div className="nav-left">
        <Link to="/" className="nav-logo">
          🦉 ReadOwl
        </Link>
      </div>

      {/* HAMBURGER MENU ICON */}
      <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? "✕" : "☰"}
      </button>

      {/* NAV LINKS (DESKTOP + MOBILE DROPDOWN) */}
      <div className={`nav-links ${menuOpen ? "show" : ""}`}>
        <Link className="nav-link" to="/" onClick={() => setMenuOpen(false)}>
          Home
        </Link>

        {role === "admin" && (
          <>
            <Link
              className="nav-link"
              to="/admin/dashboard"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              className="nav-link"
              to="/admin/upload"
              onClick={() => setMenuOpen(false)}
            >
              Upload
            </Link>
            <Link
              className="nav-link"
              to="/admin/sales"
              onClick={() => setMenuOpen(false)}
            >
              Sales
            </Link>
          </>
        )}

        {token && role === "user" && (
          <Link
            className="nav-link"
            to="/library"
            onClick={() => setMenuOpen(false)}
          >
            My Library
          </Link>
        )}

        {/* AUTH BUTTONS */}
        {!token ? (
          <>
            <Link
              className="nav-btn-outline mobile-full"
              to="/login"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              className="nav-btn mobile-full"
              to="/signup"
              onClick={() => setMenuOpen(false)}
            >
              Sign Up
            </Link>
          </>
        ) : (
          <button
            className="nav-btn mobile-full"
            onClick={() => {
              logout();
              setMenuOpen(false);
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
