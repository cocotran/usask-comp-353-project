const db = require("./db.js");

const TABLE_TRACKER = "trackers";

class TrackerEntry {
  constructor(entry) {
    this.entryDate = entry.entryDate;
    this.clientID = entry.clientID;
    this.fatique = entry.fatique;
    this.anxiety = entry.anxiety;
    this.unmotivated = entry.unmotivated;
    this.sadness = entry.sadness;
    this.irritable = entry.irritable;
    this.headache = entry.headache;
    this.crying = entry.crying;
    this.bodyaches = entry.bodyaches;
    this.jounaling = entry.jounaling;
    this.mediation = entry.mediation;
    this.yoga = entry.yoga;
  }
}

TrackerEntry.create = (newEntry, func) => {
  db.query(`INSERT INTO ${TABLE_TRACKER} SET ?`, newEntry, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      func(err, null);
      return;
    }

    // console.log("Created entry: ", { id: res.insertId, ...newStaff });
    func(null, { id: res.insertId, ...newEntry });
  });
};

TrackerEntry.findById = (id, func) => {
  db.query(
    `SELECT * FROM ${TABLE_TRACKER} WHERE clientID = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        func(err, null);
        return;
      }

      if (res.length) {
        // console.log("Found entry: ", res[0]);
        func(null, res);
        return;
      }

      // not found
      func({ kind: "not_found" }, null);
    }
  );
};

TrackerEntry.getAll = (func) => {
  let query = `SELECT * FROM ${TABLE_TRACKER}`;

  db.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      func(null, err);
      return;
    }

    // console.log("entry: ", res);
    func(null, res);
  });
};

TrackerEntry.updateById = (id, entry, func) => {
  db.query(
    `UPDATE ${TABLE_TRACKER} SET entryDate = ?, clientID = ?, fatique = ?, irritable = ?, unmotivated = ?, sadness = ?, headache = ?, crying = ?, bodyaches = ?, , jounaling = ?, mediation = ?, yoga = ? WHERE entryID = ?`,
    [
      entry.entryDate,
      entry.clientID,
      entry.fatique,
      entry.irritable,
      entry.unmotivated,
      entry.sadness,
      entry.headache,
      entry.crying,
      entry.bodyaches,
      entry.jounaling,
      entry.mediation,
      entry.yoga,
    ],
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

      // console.log("Updated entry: ", { id: id, ...staff });
      func(null, { id: id, ...entry });
    }
  );
};

TrackerEntry.removeById = (id, func) => {
  db.query(`DELETE FROM ${TABLE_TRACKER} WHERE entryID = ?`, id, (err, res) => {
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

    // console.log("Deleted entry with id: ", id);
    func(null, res);
  });
};

TrackerEntry.removeAll = (func) => {
  db.query(`DELETE FROM ${TABLE_TRACKER}`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      func(null, err);
      return;
    }

    // console.log(`Deleted ${res.affectedRows}`);
    func(null, res);
  });
};

module.exports = TrackerEntry;
