module.exports = (app) => {
    const clientController = require("../controllers/client.controller.js");
  
    const clientRouter = require("express").Router();
  
    // Create a new staff
    clientRouter.post("/", clientController.register);
  
    // Retrieve all staffs
    clientRouter.get("/all", clientController.findAll);
  
    // Retrieve a single staff with id
    clientRouter.get("/:id", clientController.findById);
  
    // Update a staff with id
    clientRouter.put("/:id", clientController.update);

    // Delete all staffs
    clientRouter.delete("/all", clientController.deleteAll);
  
    // Delete a staff with id
    clientRouter.delete("/:id", clientController.delete);
  
    app.use("/api/client", clientRouter);
  };
  