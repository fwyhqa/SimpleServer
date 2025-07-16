CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  level INT DEFAULT 1
);

CREATE TABLE IF NOT EXISTS items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT
);

CREATE TABLE IF NOT EXISTS user_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  item_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (item_id) REFERENCES items(id)
);

-- 插入测试数据
INSERT INTO users (username, password, level) VALUES ('testuser', 'password123', 1);
INSERT INTO items (name, description) VALUES ('Sword', 'A sharp blade'), ('Shield', 'A sturdy shield');
INSERT INTO user_items (user_id, item_id) VALUES (1, 1);