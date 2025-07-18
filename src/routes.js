const express = require('express');
const router = express.Router();
const pool = require('./db');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
    if (rows.length > 0) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.get('/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, username, role FROM users');
    res.json(rows);
  } catch (err) {
    console.error('Fetch users error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/users', async (req, res) => {
  const { username, password, role } = req.body;
  try {
    await pool.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, password, role || 'user']);
    res.json({ success: true, message: 'User added' });
  } catch (err) {
    console.error('Add user error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'User deleted' });
  } catch (err) {
    console.error('Delete user error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.get('/items', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM items');
    res.json(rows);
  } catch (err) {
    console.error('Fetch items error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/items', async (req, res) => {
  const { name, description, quantity } = req.body;
  try {
    await pool.query('INSERT INTO items (name, description, quantity) VALUES (?, ?, ?)', [name, description, quantity]);
    res.json({ success: true, message: 'Item added' });
  } catch (err) {
    console.error('Add item error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.delete('/items/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM items WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Item deleted' });
  } catch (err) {
    console.error('Delete item error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;