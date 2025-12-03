import React from "react";
import { Link, useNavigate } from "react-router-dom";

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
    <nav
      style={{
        padding: "12px 20px",
        background: "#f5f5f5",
        borderBottom: "1px solid #ddd",
        marginBottom: "20px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
      }}
    >
      {/* PUBLIC LINKS */}
      <Link to="/">Home</Link>

      {/* ADMIN LINKS */}
      {role === "admin" && (
        <>
          <Link to="/admin/dashboard">Admin Dashboard</Link>
          <Link to="/admin/upload">Upload Ebook</Link>
        </>
      )}

      {/* AUTH LINKS */}
      {!token ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup" style={{ marginLeft: 10 }}>
            Sign Up
          </Link>
        </>
      ) : (
        <button onClick={logout} style={{ marginLeft: "auto" }}>
          Logout
        </button>
      )}
    </nav>
  );
}
