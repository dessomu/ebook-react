import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { setAuthToken } from "./services/api";
import "./App.css";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import NavBar from "./components/NavBar";

import EbookList from "./pages/EbookList";
import EbookDetails from "./pages/EbookDetails";

import MyLibrary from "./pages/MyLibrary";

import AdminUpload from "./pages/AdminUpload";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import EditEbook from "./pages/Admin/EditEbook";
import SalesDashboard from "./pages/Admin/SalesDashboard";

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

        {/* USER LIBRARY */}
        <Route path="/library" element={<MyLibrary />} />

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

        <Route
          path="/admin/ebook/:id/edit"
          element={
            <AdminRoute>
              <EditEbook />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/sales"
          element={
            <AdminRoute>
              <SalesDashboard />
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
