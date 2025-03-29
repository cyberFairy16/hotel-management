import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import rooms from "../data/rooms";
import "../styles/RoomPage.css";

const RoomPage = () => {
  const { id } = useParams();
  const room = rooms.find((room) => room.id === parseInt(id));

  const [dynamicPrice, setDynamicPrice] = useState(room.price);

  useEffect(() => {
    const adjustPrice = () => {
      let updatedPrice = room.price;
      
      // Example: Increase price by 20% during peak seasons (e.g., December, February)
      const peakSeasons = [12, 2]; // December & February
      const currentMonth = new Date().getMonth() + 1;

      if (peakSeasons.includes(currentMonth)) {
        updatedPrice *= 1.2; // Increase by 20%
      }

      // Example: Increase price by 15% if more than 80% of rooms are booked
      const occupancyRate = Math.random() * 100; // Simulated data
      if (occupancyRate > 80) {
        updatedPrice *= 1.15;
      }

      setDynamicPrice(updatedPrice.toFixed(2));
    };

    adjustPrice();
  }, [room.price]);

  if (!room) {
    return <h2>Room not found</h2>;
  }

  return (
    <div className="room-page">
      <img src={room.image} alt={room.name} />
      <h1>{room.name}</h1>
      <p>{room.description}</p>
      <p><strong>${dynamicPrice}</strong> per night</p>
      <ul>
        {room.amenities.map((amenity, index) => (
          <li key={index}>{amenity}</li>
        ))}
      </ul>
      <Link to={`/booking/${room.id}`} className="btn">Book Now</Link>
    </div>
  );
};

export default RoomPage;
