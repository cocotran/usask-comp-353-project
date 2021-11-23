const path = require('path');
const express = require('express');


// ================= Server Config =================
const app = express();
app.use(express.json()) // for parsing application/json
const port = process.env.PORT || 3000;

app.get("/ping", (req, res) => {
    res.send("Pong");
})


// ================= Templates Handlers =================
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/home.html'));
})

app.get("/client", (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/client.html'));
})

app.get("/staff", (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/staff.html'));
})

app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/admin.html'));
})


// ================= API Handlers =================


// ================= Start Server =================
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})