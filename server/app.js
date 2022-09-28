const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "../dist")));

app.post("/api/ping", (req, res) => {
  res.json({
    status: "success",
    message: "Here is data from your POST params",
    data: req.body,
  });
});

module.exports = app;
