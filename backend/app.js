const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// RDS connection
const db = mysql.createConnection({
  host: "<RDS-ENDPOINT>",
  user: "admin",
  password: "password",
  database: "formdb"
});

// API
app.post("/api/submit", (req, res) => {
  const { name, email } = req.body;

  const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
  db.query(sql, [name, email], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error");
    }
    res.send("Data saved");
  });
});

// Health check
app.get("/", (req, res) => {
  res.send("Backend running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});