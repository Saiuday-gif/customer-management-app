const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to SQLite database
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
    // Create the customers table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL
    )`, (createErr) => {
      if (createErr) {
        console.error('Error creating customers table:', createErr.message);
      } else {
        console.log('Customers table is ready.');
      }
    });
  }
});

// GET all customers
app.get('/', (req, res) => {
  db.all("SELECT id, name, email FROM customers", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(rows);
  });
});

// POST a new customer
app.post('/customers', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  const sql = 'INSERT INTO customers (name, email) VALUES (?, ?)';
  db.run(sql, [name, email], function(err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, name, email });
  });
});

// PUT (Update) a customer
app.put('/customers/:id', (req, res) => {
  const {} = req.params;
  const {} = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  const sql = 'UPDATE customers SET name = ?, email = ? WHERE id = ?';
  db.run(sql, [name, email, id], function(err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Customer not found.' });
    }
    res.status(200).json({ message: 'Customer updated successfully.' });
  });
});

// DELETE a customer
app.delete('/customers/:id', (req, res) => {
  const {} = req.params;

  const sql = 'DELETE FROM customers WHERE id = ?';
  db.run(sql, id, function(err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Customer not found.' });
    }
    res.status(200).json({ message: 'Customer deleted successfully.' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:5001`);
});
