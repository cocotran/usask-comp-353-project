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

CREATE TABLE IF NOT EXISTS trackers (
	entryID INT PRIMARY KEY AUTO_INCREMENT,
	entryDate DATE,
    clientID  INT,
    fatique INT,
    anxiety INT,
    unmotivated INT,
    sadness INT,
    irritable INT,
    headache INT,
    crying INT,
    bodyaches INT,
	jounaling INT,
    mediation INT,
    yoga INT
);