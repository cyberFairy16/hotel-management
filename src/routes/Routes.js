import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home";
import RoomPage from "../pages/RoomDetails";
import BookingPage from "../pages/Bookings";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// import Register from "../pages/Register";
import AuthPage from "../pages/AuthPage"; // Update to the correct file path

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/room/:id" element={<RoomPage />} />
        <Route path="/booking/:id" element={<BookingPage />} />
        {/*<Route path="/register" element={<Register />} /> */}
        <Route path="/auth" element={<AuthPage />} /> {/* Route for the login/register page */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRoutes;
