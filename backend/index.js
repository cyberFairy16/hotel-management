const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
// Create a connection
const db = mysql.createConnection({
  host: "localhost",     // Replace with your DB host
  user: "root",          // Your MySQL username
  password: "Fastrunner#11",  // Your MySQL password
  database: "hotels_database"   // Your database name
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to database.");
  }
});

// Sample route to get all bookings
app.get("/api/hotels", (req, res) => {
  db.query("SELECT * FROM hotels WHERE id > 2600000 AND id < 26000010", (err, results) => {
    if (err) {
      res.status(500).send("Error fetching hotels");
    } else {
      res.json(results);
    }
  });
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});

app.get("/api/hotels/search", (req, res) => {
  const searchTerm = req.query.q;

  const query = `
    SELECT * FROM hotels 
    WHERE name LIKE ?
  `;

  const formattedSearch = `%${searchTerm}%`;

  db.query(query, [formattedSearch], (err, results) => {
    if (err) {
      console.error("Search query error:", err);
      res.status(500).send("Error searching hotels");
    } else {
      res.json(results);
    }
  });
});

app.get("/api/hotels/:id", (req, res) => {
  const hotelId = req.params.id;

  db.query("INSERT INTO guests (name, address, email, password) Values (?,?,?,?)", [fullName, address, email, password], (err, results) => {
    if (err) {
      res.status(500).send("Error fetching hotel details");
    } else {
      res.json(results[0]);
    }
  });
});