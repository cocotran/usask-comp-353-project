const Staff = require("../models/staff.model.js");

// Create and Save a new Staff
exports.register = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Staff
  const staff = new Staff({
    name: req.body.name,
    role: req.body.role,
    dob: req.body.dob,
    phoneNumber: req.body.phoneNumber,
  });

  // Save Staff in the database
  Staff.create(staff, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while register staff.",
      });
    else res.send(data);
  });
};

// Retrieve all staffs from the database (with condition).
exports.findAll = (req, res) => {
  //   const name = req.query.title;

  Staff.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving staffs.",
      });
    else res.send(data);
  });
};

// Find a single staff by Id
exports.findById = (req, res) => {
  Staff.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found staff with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving staff with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Update staff identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Staff.updateById(req.params.id, new Staff(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found staff with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating staff with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete staff with the specified id in the request
exports.delete = (req, res) => {
  Staff.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found staff with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete staff with id " + req.params.id,
        });
      }
    } else res.send({ message: `Staff was deleted successfully!` });
  });
};

// Delete all staffs from the database.
exports.deleteAll = (req, res) => {
  Staff.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all staffs.",
      });
    else res.send({ message: `All staffs were deleted successfully!` });
  });
};
