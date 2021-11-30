const ClientList = require("../models/clientlist.model.js");

// Create and Save a new clientlist
exports.register = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a clientlist
  const client = new ClientList({
    clientID: req.body.clientID,
    staffID: req.body.staffID
  });

  // Save clientlist in the database
  ClientList.create(client, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while register clientlist.",
      });
    else res.send(data);
  });
};

// Retrieve all clientlist from the database (with condition).
exports.findAll = (req, res) => {
  //   const name = req.query.title;

  ClientList.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving clientlist.",
      });
    else res.send(data);
  });
};

// Find a single staff by Id
exports.findStaffById = (req, res) => {
  ClientList.findStaffById(req.params.id, (err, data) => {
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

// Find a single clientlist by Id
exports.findClientById = (req, res) => {
    ClientList.findClientById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found client with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: "Error retrieving clientlist with id " + req.params.id,
          });
        }
      } else res.send(data);
    });
  };

// Update clientlist identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  ClientList.updateById(req.params.id, new ClientList(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found clientlist with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating clientlist with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete clientlist with the specified id in the request
exports.delete = (req, res) => {
  ClientList.removeById(req.body.staffID, req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found clientlist with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete clientlist with id " + req.params.id,
        });
      }
    } else res.send({ message: `Client was deleted successfully!` });
  });
};

// Delete all clientlist from the database.
exports.deleteAll = (req, res) => {
  ClientList.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all clientlist.",
      });
    else res.send({ message: `All clientlist were deleted successfully!` });
  });
};
