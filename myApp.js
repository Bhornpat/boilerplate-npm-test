const express = require('express');
const app = express();
require('dotenv').config(); // for future env usage

//  MIDDLEWARE: Log every request
app.use(function(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);  //var string = req.method + " " + req.path + " - " + req.ip;
  next(); // Don't forget this!
});

// Requirement #1: log to console (for test system)
console.log("Hello World");

// Serve index.html at "/"
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// Serve JSON at "/json"
app.get("/json", function(req, res) {
  const message = process.env.MESSAGE_STYLE === "uppercase"
    ? "Hello json".toUpperCase()
    : "Hello json";

  res.json({ message });

});

const middleware = (req, res, next) => {
  req.time = new Date().toString();
  next();
};

app.get("/now", middleware, (req, res) => {
  res.send({
    time: req.time
  });
});

//http://vmserver:3000/f/echo    = {"echo":"f"}    Get Route Parameter Input from the Client

app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({
    echo: word
  });
});

//Get Query Parameter Input from the Client
app.get("/name", function(req, res) {
  //const firstName = req.query.first;
  //const lastName = req.query.last;
  const { first: firstName, last: lastName } = req.query;
  // Use template literals to form a formatted string
  res.json({ name: `${firstName} ${lastName}` }
  );
});


// Serve static assets at "/public"
app.use("/public", express.static(__dirname + "/public"));

module.exports = app;











