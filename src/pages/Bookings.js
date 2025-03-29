import React, { useState } from "react";
import { useParams } from "react-router-dom";
import rooms from "../data/rooms";
import "../styles/Bookings.css";

const BookingPage = () => {
  const { id } = useParams();
  const room = rooms.find((room) => room.id === parseInt(id));
  
  const [formData, setFormData] = useState({ name: "", email: "", checkIn: "", checkOut: "" });
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const pointsEarned = Math.floor(room.price * 1);
    setLoyaltyPoints(loyaltyPoints + pointsEarned);
    alert(`Booking confirmed for ${formData.name} in ${room.name}! You earned ${pointsEarned} loyalty points.`);
  };

  return (
    <div className="booking-page">
      <h1>Book {room.name}</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" required onChange={handleChange} />
        <input type="email" name="email" placeholder="Your Email" required onChange={handleChange} />
        <input type="date" name="checkIn" required onChange={handleChange} />
        <input type="date" name="checkOut" required onChange={handleChange} />
        <button type="submit">Confirm Booking</button>
      </form>
      <p>Loyalty Points: {loyaltyPoints}</p>
      {loyaltyPoints >= 500 && <p>🎉 You are eligible for a $10 discount on your next booking!</p>}
      {loyaltyPoints >= 1000 && <p>🎉 Enjoy a free spa treatment with your next stay!</p>}
    </div>
  );
};

export default BookingPage;