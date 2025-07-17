const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'yourpassword',
  database: process.env.DB_NAME || 'simple_server',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function connectWithRetry() {
  let retries = 5;
  while (retries) {
    try {
      await pool.getConnection();
      console.log('Connected to MySQL');
      return;
    } catch (err) {
      console.error('MySQL connection failed:', err);
      retries -= 1;
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
  throw new Error('Failed to connect to MySQL');
}
connectWithRetry();

module.exports = pool;