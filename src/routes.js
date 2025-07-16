const express = require('express');
const pool = require('./db');

const router = express.Router();

// 登录
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
    if (rows.length > 0) {
      res.json({ success: true, message: 'Login successful', user: rows[0] });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// 升级
router.post('/upgrade', async (req, res) => {
  const { userId } = req.body;
  try {
    const [rows] = await pool.query('SELECT level FROM users WHERE id = ?', [userId]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const newLevel = rows[0].level + 1;
    await pool.query('UPDATE users SET level = ? WHERE id = ?', [newLevel, userId]);
    res.json({ success: true, message: `User upgraded to level ${newLevel}` });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// 获取物品
router.post('/get-item', async (req, res) => {
  const { userId, itemId } = req.body;
  try {
    const [rows] = await pool.query('SELECT * FROM items WHERE id = ?', [itemId]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    await pool.query('INSERT INTO user_items (user_id, item_id) VALUES (?, ?)', [userId, itemId]);
    res.json({ success: true, message: 'Item acquired', item: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// 获取所有用户
router.get('/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json({ success: true, users: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// 添加用户
router.post('/users', async (req, res) => {
  const { username, password, level } = req.body;
  try {
    await pool.query('INSERT INTO users (username, password, level) VALUES (?, ?, ?)', [username, password, level || 1]);
    res.json({ success: true, message: 'User added' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// 更新用户
router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { username, password, level } = req.body;
  try {
    await pool.query('UPDATE users SET username = ?, password = ?, level = ? WHERE id = ?', [username, password, level, id]);
    res.json({ success: true, message: 'User updated' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// 删除用户
router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
    res.json({ success: true, message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// 获取所有物品
router.get('/items', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM items');
    res.json({ success: true, items: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// 添加物品
router.post('/items', async (req, res) => {
  const { name, description } = req.body;
  try {
    await pool.query('INSERT INTO items (name, description) VALUES (?, ?)', [name, description]);
    res.json({ success: true, message: 'Item added' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// 更新物品
router.put('/items/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    await pool.query('UPDATE items SET name = ?, description = ? WHERE id = ?', [name, description, id]);
    res.json({ success: true, message: 'Item updated' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// 删除物品
router.delete('/items/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM items WHERE id = ?', [id]);
    res.json({ success: true, message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// 获取用户物品
router.get('/user-items', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT ui.id, u.username, i.name FROM user_items ui JOIN users u ON ui.user_id = u.id JOIN items i ON ui.item_id = i.id');
    res.json({ success: true, userItems: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// 删除用户物品
router.delete('/user-items/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM user_items WHERE id = ?', [id]);
    res.json({ success: true, message: 'User item deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

module.exports = router;