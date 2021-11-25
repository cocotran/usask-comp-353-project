CREATE DATABASE IF NOT EXISTS project;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

flush privileges;

CREATE TABLE IF NOT EXISTS staffs (
	staffID INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    role VARCHAR(255),
    dob DATE,
    phone VARCHAR(11)
);

CREATE TABLE IF NOT EXISTS clients (
	clientID INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    dob DATE,
    phoneNumber VARCHAR(11)
);