module.exports = (app) => {
    const trackerController = require("../controllers/tracker.controller.js");
  
    const trackerRouter = require("express").Router();
  
    // Create a new staff
    trackerRouter.post("/", trackerController.register);
  
    // Retrieve all staffs
    trackerRouter.get("/all", trackerController.findAll);
  
    // Retrieve a single staff with id
    trackerRouter.get("/:id", trackerController.findById);
  
    // Update a staff with id
    trackerRouter.put("/:id", trackerController.update);
  
    // Delete a staff with id
    trackerRouter.delete("/:id", trackerController.delete);
  
    // Delete all staffs
    trackerRouter.delete("/all", trackerController.deleteAll);
  
    app.use("/api/tracker", trackerRouter);
  };
  