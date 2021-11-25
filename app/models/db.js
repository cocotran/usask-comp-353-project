const mysql = require("mysql");

const Config = Object.freeze({
  host: "localhost",
  user: "root",
  password: "2732000",
  database: "project",
});

const connection = mysql.createPool(Config);

module.exports = connection;
