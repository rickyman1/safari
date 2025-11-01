// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import HotelsPage from "./pages/HotelsPage";
import PackagesPage from "./pages/PackagesPage";
import SubscribePage from "./pages/SubscribePage";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  return (
    <Router>
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hotels" element={<HotelsPage />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/subscribe" element={<SubscribePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={isAdmin ? <AdminDashboard /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
