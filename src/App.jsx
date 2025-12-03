import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { setAuthToken } from "./services/api";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import NavBar from "./components/NavBar";

import EbookList from "./pages/EbookList";
import EbookDetails from "./pages/EbookDetails";

import AdminUpload from "./pages/AdminUpload";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";

export default function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setAuthToken(token);
  }, []);

  return (
    <>
      <NavBar />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<EbookList />} />
        <Route path="/ebook/:id" element={<EbookDetails />} />

        {/* ADMIN */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/upload"
          element={
            <AdminRoute>
              <AdminUpload />
            </AdminRoute>
          }
        />

        {/* AUTH PAGES */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}
