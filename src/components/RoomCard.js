import React from "react";
import { Link } from "react-router-dom";
// import "./RoomCard.css";

const RoomCard = ({ room }) => {
  return (
    <div className="room-card">
      <img src={room.image} alt={room.name} />
      <h2>{room.name}</h2>
      <p>{room.description}</p>
      <p><strong>${room.price}</strong> per night</p>
      <Link to={`/room/${room.id}`} className="btn">View Details</Link>
    </div>
  );
};

export default RoomCard;
