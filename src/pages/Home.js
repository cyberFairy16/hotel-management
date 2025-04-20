import React from "react";
import { useNavigate } from "react-router-dom";
import rooms from "../data/rooms";
import RoomCard from "../components/RoomCard";
import "../styles/HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="hero">
        <h1>Welcome to Ocean Breeze Hotel</h1>
        <p>Luxury stays, unforgettable experiences.</p>

        {/* Login/Register Button */}
        <button className="login-btn" onClick={() => navigate("/auth")}>
          Login / Register
        </button>
      
      {/* Loyalty Program Button */}
      <button
          className="loyalty-btn"
          onClick={() => navigate("/loyalty")}
          style={{
            padding: "10px 20px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
            marginTop: "20px",
            cursor: "pointer",
          }}
        >
          Go to Loyalty Program
        </button>
      </div>

      <div className="room-list">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
