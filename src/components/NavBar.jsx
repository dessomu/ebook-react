import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/NavBar.css";

import API from "../services/api";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const navRef = useRef(null);

  const logout = async () => {
    try {
      const res = await API.post("/auth/logout");
      console.log(res);
    } catch (err) {
      console.error("Logout failed", err);
    }
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="nav-container" ref={navRef}>
      {/* Left section */}
      <div className="nav-left">
        <Link to="/" className="nav-logo">
          🦉 <span class="owl">owl</span>
          {""}
          <span class="reads">reads</span>
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

        {role === "user" && (
          <Link
            className="nav-link"
            to="/library"
            onClick={() => setMenuOpen(false)}
          >
            My Library
          </Link>
        )}

        {/* AUTH BUTTONS */}
        {!role ? (
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
