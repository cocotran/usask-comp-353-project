const Client = require("../models/client.model.js");

// Create and Save a new client
exports.register = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a client
  const client = new Client({
    name: req.body.name,
    dob: req.body.dob,
    phoneNumber: req.body.phoneNumber,
  });

  // Save client in the database
  Client.create(client, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while register client.",
      });
    else res.send(data);
  });
};

// Retrieve all clients from the database (with condition).
exports.findAll = (req, res) => {
  //   const name = req.query.title;

  Client.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving clients.",
      });
    else res.send(data);
  });
};

// Find a single client by Id
exports.findById = (req, res) => {
  Client.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found client with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving client with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Update client identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Client.updateById(req.params.id, new Client(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found client with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating client with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete client with the specified id in the request
exports.delete = (req, res) => {
  Client.removeById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found client with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete client with id " + req.params.id,
        });
      }
    } else res.send({ message: `Client was deleted successfully!` });
  });
};

// Delete all clients from the database.
exports.deleteAll = (req, res) => {
  Client.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all clients.",
      });
    else res.send({ message: `All clients were deleted successfully!` });
  });
};
