const path = require("path");
const express = require("express");

// ================= Server Config =================
const app = express();
app.use(express.static(__dirname + "/static"));
app.use(express.json()); // for parsing application/json; bodyParser.json() is deprecated
const PORT = process.env.NODEJS_LOCAL_PORT || 3000;

// ================= Templates Handlers =================
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "templates/home.html"));
});

app.get("/client/profile", (req, res) => {
  res.sendFile(path.join(__dirname, "templates/client-profile.html"));
});

app.get("/client/entry", (req, res) => {
  res.sendFile(path.join(__dirname, "templates/client-entry.html"));
});

app.get("/staff", (req, res) => {
  res.sendFile(path.join(__dirname, "templates/staff.html"));
});

app.get("/staff/add", (req, res) => {
  res.sendFile(path.join(__dirname, "templates/staff-add.html"));
});

app.get("/admin/staff", (req, res) => {
  res.sendFile(path.join(__dirname, "templates/admin-staff.html"));
});

app.get("/admin/client", (req, res) => {
  res.sendFile(path.join(__dirname, "templates/admin-client.html"));
});

// ================= CRUD API Handlers =================
// For testing
app.get("/ping", (req, res) => {
  res.send("Pong");
});

// Set up routes to handle staff related info
require("./routes/staff.routes.js")(app);

// Set up routes to handle client related info
require("./routes/client.routes.js")(app);

// Set up routes to handle tracker related info
require("./routes/tracker.routes.js")(app);

// Set up routes to handle tracker related info
require("./routes/clientlist.routes.js")(app);

// ================= Start Server =================
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
