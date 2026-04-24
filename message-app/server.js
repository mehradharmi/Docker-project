const express = require("express");
const mysql = require("mysql2");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static("public"));

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: "root",
  password: "root",
  database: "testdb"
});

db.connect((err) => {
  if (err) console.log(err);
  else console.log("Connected to DB");
});

// Create table
app.get("/init", (req, res) => {
  db.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      text VARCHAR(255)
    )
  `);
  res.send("Table ready");
});

// Add message
app.post("/add", (req, res) => {
  const { text } = req.body;
  db.query("INSERT INTO messages (text) VALUES (?)", [text]);
  res.send("Message added");
});

// Get all messages
app.get("/messages", (req, res) => {
  db.query("SELECT * FROM messages", (err, result) => {
    res.json(result);
  });
});

app.listen(3000, () => console.log("Server running"));
