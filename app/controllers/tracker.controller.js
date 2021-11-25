const TrackerEntry = require("../models/tracker.model.js");

// Create and Save a new entry
exports.register = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a entry
  const entry = new TrackerEntry({
    name: req.body.name,
    dob: req.body.dob,
    phoneNumber: req.body.phoneNumber,
    entryDate: req.body.entryDate,
    clientID: req.body.clientID,
    fatique: req.body.fatique,
    anxiety: req.body.anxiety,
    unmotivated: req.body.unmotivated,
    sadness: req.body.sadness,
    irritable: req.body.irritable,
    headache: req.body.headache,
    crying: req.body.crying,
    bodyaches: req.body.bodyaches,
    jounaling: req.body.jounaling,
    mediation: req.body.mediation,
    yoga: req.body.yoga,
  });

  // Save entry in the database
  TrackerEntry.create(entry, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while register entry.",
      });
    else res.send(data);
  });
};

// Retrieve all entries from the database (with condition).
exports.findAll = (req, res) => {
  //   const name = req.query.title;

  TrackerEntry.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving entries.",
      });
    else res.send(data);
  });
};

// Find a single entry by Id
exports.findById = (req, res) => {
  TrackerEntry.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found entry with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving entry with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Update entry identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  TrackerEntry.updateById(req.params.id, new TrackerEntry(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found entry with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating entry with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete entry with the specified id in the request
exports.delete = (req, res) => {
  TrackerEntry.removeById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found entry with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete entry with id " + req.params.id,
        });
      }
    } else res.send({ message: `Entry was deleted successfully!` });
  });
};

// Delete all entries from the database.
exports.deleteAll = (req, res) => {
  TrackerEntry.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all entries.",
      });
    else res.send({ message: `All entries were deleted successfully!` });
  });
};
