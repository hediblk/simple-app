// init_db.js
const { DB_PATH } = require("./config");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(`${DB_PATH}`);

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)");

  db.run("INSERT INTO users (name, email) VALUES ('John Doe', 'john@example.com')");
  db.run("INSERT INTO users (name, email) VALUES ('Jane Smith', 'jane@example.com')");
});

db.close();
