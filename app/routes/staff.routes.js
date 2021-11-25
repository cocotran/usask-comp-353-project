module.exports = (app) => {
  const staffController = require("../controllers/staff.controller.js");

  const staffRouter = require("express").Router();

  // Create a new staff
  staffRouter.post("/", staffController.register);

  // Retrieve all staffs
  staffRouter.get("/all", staffController.findAll);

  // Retrieve a single staff with id
  staffRouter.get("/:id", staffController.findById);

  // Update a staff with id
  staffRouter.put("/:id", staffController.update);

  // Delete a staff with id
  staffRouter.delete("/:id", staffController.delete);

  // Delete all staffs
  staffRouter.delete("/all", staffController.deleteAll);

  app.use("/api/staff", staffRouter);
};
