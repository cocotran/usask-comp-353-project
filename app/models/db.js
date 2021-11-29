const mysql = require("mysql");

const Config = Object.freeze({
  host: process.env.MYSQL_HOST || "remotemysql.com",
  user: process.env.MYSQL_USERNAME || "e5Re0vo7cA",
  password: process.env.MYSQL_ROOT_PASSWORD || "4DOSfMYUoM",
  database: process.env.MYSQL_DATABASE || "e5Re0vo7cA",
});

const connection = mysql.createPool(Config);

module.exports = connection;
