const express = require("express");
const bodyParser = require("body-parser");
const mongoos = require("mongoose");

const postsRoutes = require("./routes/posts");

const app = express();

mongoos
  .connect(
    "mongodb+srv://georg:eA1yPjHYGM3dbDLG@cluster0.rdxl5pl.mongodb.net/mean-stack?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Conneted to MongoDB");
  })
  .catch((err) => {
    console.log("Connection failed!" + err.message);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add headers before the routes are defined
app.use((req, res, next) => {
  // Website you wish to allow to connect , * == all
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH , PUT, DELETE , OPTIONS"
  );
  // Pass to next layer of middleware
  next();
});

app.use("/api/posts", postsRoutes);

module.exports = app;
