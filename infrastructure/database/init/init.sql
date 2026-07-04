CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

INSERT INTO users (name, email)
VALUES
('Abdelazim', 'abdelazim@example.com'),
('mustafa', 'mustafa@example.com'),
('Kiaty', 'kiaty@example.com');
