// server.js
const { PORT } = require("./config");

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db");

const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());


// Route to get all users
app.get("/api/users", (req, res) => {
  db.all("SELECT * FROM users", (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.json(rows);
  });
});

// Route to add a new user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  const query = "INSERT INTO users (name, email) VALUES (?, ?)";

  db.run(query, [name, email], function (err) {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    // Send back the newly created user
    res.json({ id: this.lastID, name, email });
  });
});

// Route to delete a user by id
app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  db.run("DELETE FROM users WHERE id = ?", userId, function (err) {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.json({ message: "User deleted successfully" });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
