const db = require("./db.js");

const TABLE_STAFF = "staffs";

class Staff {
  constructor(staff) {
    this.name = staff.name;
    this.role = staff.role;
    this.dob = staff.dob;
    this.phoneNumber = staff.phoneNumber;
  }
}

Staff.create = (newStaff, func) => {
  db.query(`INSERT INTO ${TABLE_STAFF} SET ?`, newStaff, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      func(err, null);
      return;
    }

    console.log("Created staff: ", { id: res.insertId, ...newStaff });
    func(null, { id: res.insertId, ...newStaff });
  });
};

Staff.findById = (id, func) => {
  db.query(`SELECT * FROM ${TABLE_STAFF} WHERE staffID = ${id}`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      func(err, null);
      return;
    }

    if (res.length) {
      console.log("Found staff: ", res[0]);
      func(null, res[0]);
      return;
    }

    // not found
    func({ kind: "not_found" }, null);
  });
};

Staff.getAll = (func) => {
  let query = `SELECT * FROM ${TABLE_STAFF}`;

  db.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      func(null, err);
      return;
    }

    console.log("Staffs: ", res);
    func(null, res);
  });
};

Staff.updateById = (id, staff, func) => {
  db.query(
    `UPDATE ${TABLE_STAFF} SET name = ?, role = ?, dob = ?, phoneNumber = ? WHERE staffID = ?`,
    [staff.name, staff.role, staff.dob, staff.phoneNumber, staff.id],
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

      console.log("Updated staff: ", { id: id, ...staff });
      func(null, { id: id, ...staff });
    }
  );
};

Staff.removeById = (id, func) => {
  db.query(`DELETE FROM ${TABLE_STAFF} WHERE staffID = ?`, id, (err, res) => {
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

    console.log("Deleted staff with id: ", id);
    func(null, res);
  });
};

Staff.removeAll = (func) => {
  db.query("DELETE FROM tutorials", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      func(null, err);
      return;
    }

    console.log(`Deleted ${res.affectedRows}`);
    func(null, res);
  });
};

module.exports = Staff;
