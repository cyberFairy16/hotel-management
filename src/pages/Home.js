import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import rooms from "../data/rooms";
import RoomCard from "../components/RoomCard";
import "../styles/HomePage.css";
import axios from "axios";

const HomePage = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/hotels/search", {
        params: { q: query }
      });
      setResults(res.data);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

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
      <div>
      <h2>Search Hotels</h2>
      <input
        type="text"
        placeholder="Search by name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {results.map(hotel => (
          <li key={hotel.id}>
            {hotel.name} (Rating: {hotel.rating})
          </li>
        ))}
      </ul>
    </div>
    </div>
    
  );
};

export default HomePage;
