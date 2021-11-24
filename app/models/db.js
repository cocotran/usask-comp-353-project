const mysql = require("mysql");

const Config = Object.freeze({
  host: "localhost",
  user: "admin",
  password: "admin",
  database: "project",
});

const connection = mysql.createPool(Config);

module.exports = connection;
