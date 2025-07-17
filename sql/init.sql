CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  quantity INT NOT NULL
);

INSERT INTO users (username, password, role) VALUES ('testuser', 'password123', 'admin');
INSERT INTO items (name, description, quantity) VALUES ('Sword', 'A sharp blade', 10);