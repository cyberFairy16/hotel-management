import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; // Optionally use an external CSS file for better styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">Ocean Breeze Hotel</h1>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/admin">Admin</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
