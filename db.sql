CREATE DATABASE IF NOT EXISTS project;

ALTER USER 'mysql'@'mysqldb' IDENTIFIED WITH mysql_native_password BY 'root';


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
	entryDate DATETIME,
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

CREATE TABLE IF NOT EXISTS clientlist (
	staffID INT,
    clientID INT,
	FOREIGN KEY (staffID) REFERENCES staffs(staffID),
	FOREIGN KEY (clientID) REFERENCES clients(clientID)
);