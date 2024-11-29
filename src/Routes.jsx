import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Profile from "./pages/profile/Profile";
import MainPage from "./pages/mainPage/MainPage";
import App from "./pages/auth/Auth"; // Ensure this import is correct

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} /> {/* Redirect root to login */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/mainPage" element={<MainPage />} />
      <Route path="/login" element={<App />} />
      <Route path="/register" element={<App />} />
      {/* Catch-all route for undefined paths */}
      <Route path="*" element={<Navigate to="/login" replace />} /> {/* Redirect undefined paths to login */}
    </Routes>
  );
};

export default MyRoutes;
