const path = require("path");
const express = require("express");

// ================= Server Config =================
const app = express();
app.use(express.json()); // for parsing application/json; bodyParser.json() is deprecated
const PORT = process.env.PORT || 3000;

// ================= Templates Handlers =================
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "templates/home.html"));
});

app.get("/client", (req, res) => {
  res.sendFile(path.join(__dirname, "templates/client.html"));
});

app.get("/staff", (req, res) => {
  res.sendFile(path.join(__dirname, "templates/staff.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "templates/admin.html"));
});

// ================= CRUD API Handlers =================
// For testing
app.get("/ping", (req, res) => {
  res.send("Pong");
});

// Set up routes to handle staff related info
require("./app/routes/staff.routes.js")(app);

// ================= Start Server =================
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
