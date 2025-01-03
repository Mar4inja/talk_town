import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Profile from "./pages/profile/Profile";
import App from "./pages/auth/Auth"; // Ensure this import is correct
import LandingPage from "./pages/landingPage/LandingPage";
import Countdown from './pages/countdownPage/Countdown';
import Games from "./pages/games/Games";


const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} /> {/* Redirect root to login */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/landingPage" element={<LandingPage/>} />
      <Route path="/login" element={<App />} />
      <Route path="/register" element={<App />} />
      <Route path="/countdown" element={<Countdown/>} />
      <Route path="/games" element={<Games/>} />
      {/* Catch-all route for undefined paths */}
      <Route path="*" element={<Navigate to="/login" replace />} /> {/* Redirect undefined paths to login */}
    </Routes>
  );
};

export default MyRoutes;
