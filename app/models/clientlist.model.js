const db = require("./db.js");

const TABLE_CLIENTLIST = "clientlist";

class ClientList {
  constructor(assignment) {
    this.staffID = assignment.staffID;
    this.clientID = assignment.clientID;
  }
}

ClientList.create = (assignment, func) => {
  db.query(`INSERT INTO ${TABLE_CLIENTLIST} SET ?`, assignment, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      func(err, null);
      return;
    }

    // console.log("Created client: ", { id: res.insertId, ...newStaff });
    func(null, { id: res.insertId, ...assignment });
  });
};

ClientList.findStaffById = (id, func) => {
  db.query(
    `SELECT * FROM ${TABLE_CLIENTLIST} WHERE staffID = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        func(err, null);
        return;
      }

      if (res.length) {
        // console.log("Found client: ", res[0]);
        func(null, res);
        return;
      }

      // not found
      func({ kind: "not_found" }, null);
    }
  );
};

ClientList.findClientById = (id, func) => {
  db.query(
    `SELECT * FROM ${TABLE_CLIENTLIST} WHERE clientID = ${id}`,
    (err, res) => {
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
    }
  );
};

ClientList.getAll = (func) => {
  let query = `SELECT * FROM ${TABLE_CLIENTLIST}`;

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

ClientList.updateById = (id, assignment, func) => {
  db.query(
    `UPDATE ${TABLE_CLIENTLIST} SET staffID = ?, clientID = ? WHERE clientID = ?`,
    [assignment.staffID, assignment.clientID],
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
      func(null, { id: id, ...assignment });
    }
  );
};

ClientList.removeById = (staffId, clientId, func) => {
  db.query(
    `DELETE FROM ${TABLE_CLIENTLIST} WHERE clientID = ? AND staffID = ?`,
    [clientId, staffId],
    (err, res) => {
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
    }
  );
};

ClientList.removeAll = (func) => {
  db.query(`DELETE FROM ${TABLE_CLIENTLIST}`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      func(null, err);
      return;
    }

    // console.log(`Deleted ${res.affectedRows}`);
    func(null, res);
  });
};

module.exports = ClientList;
