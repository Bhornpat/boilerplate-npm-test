const express = require('express');
const app = express();

// Requirement #1: log to console
console.log("Hello World");

// Requirement #2: create route for "/"
app.get("/", function(req, res) {
  res.send("Hello World");
});

module.exports = app;























