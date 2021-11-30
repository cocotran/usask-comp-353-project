module.exports = (app) => {
  const clientlistController = require("../controllers/clientlist.controller.js");

  const clientRouter = require("express").Router();

  // Create a new staff
  clientRouter.post("/", clientlistController.register);

  // Retrieve all staffs
  clientRouter.get("/all", clientlistController.findAll);

  // Retrieve a single staff with id
  clientRouter.get("/staff/:id", clientlistController.findStaffById);

  // Retrieve a single staff with id
  clientRouter.get("/client/:id", clientlistController.findClientById);

  // Update a staff with id
  clientRouter.put("/:id", clientlistController.update);

  // Delete all staffs
  clientRouter.delete("/all", clientlistController.deleteAll);

  // Delete a staff-client pair with ids
  clientRouter.delete("/:id", clientlistController.delete);

  app.use("/api/clientlist", clientRouter);
};
