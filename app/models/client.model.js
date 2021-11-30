
const db = require("./db.js");

const TABLE_CLIENT = "clients";

class Client {
  constructor(client) {
    this.name = client.name;
    this.dob = client.dob;
    this.phoneNumber = client.phoneNumber;
  }
}

Client.create = (newStaff, func) => {
  db.query(`INSERT INTO ${TABLE_CLIENT} SET ?`, newStaff, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      func(err, null);
      return;
    }

    // console.log("Created client: ", { id: res.insertId, ...newStaff });
    func(null, { id: res.insertId, ...newStaff });
  });
};

Client.findById = (id, func) => {
  db.query(`SELECT * FROM ${TABLE_CLIENT} WHERE clientID = ${id}`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      func(err, null);
      return;
    }

    if (res.length) {
      // console.log("Found client: ", res[0]);
      func(null, res[0]);
      return;
    }

    // not found
    func({ kind: "not_found" }, null);
  });
};

Client.getAll = (func) => {
  let query = `SELECT * FROM ${TABLE_CLIENT}`;

  db.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      func(null, err);
      return;
    }

    // console.log("client: ", res);
    func(null, res);
  });
};

Client.updateById = (id, client, func) => {
  db.query(
    `UPDATE ${TABLE_CLIENT} SET name = ?, dob = ?, phoneNumber = ? WHERE clientID = ?`,
    [client.name, client.dob, client.phoneNumber, id],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        func(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found
        func({ kind: "not_found" }, null);
        return;
      }

      // console.log("Updated client: ", { id: id, ...staff });
      func(null, { id: id, ...client });
    }
  );
};

Client.removeById = (id, func) => {
  db.query(`DELETE FROM ${TABLE_CLIENT} WHERE clientID = ?`, id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      func(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      func({ kind: "not_found" }, null);
      return;
    }

    // console.log("Deleted client with id: ", id);
    func(null, res);
  });
};

Client.removeAll = (func) => {
  db.query(`DELETE FROM ${TABLE_CLIENT}`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      func(null, err);
      return;
    }

    // console.log(`Deleted ${res.affectedRows}`);
    func(null, res);
  });
};

module.exports = Client;
