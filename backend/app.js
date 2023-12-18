const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

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
    "Access-Control-Allow-Methots",
    "GET, POST, PATCH, DELETE , OPTIONS"
  );
  // Pass to next layer of middleware
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = req.body;
  console.log(post);
  // response zurück schicken und damit wird beendet.
  res.status(201).json({ message: "Post added successfully" });
});

app.get("/api/posts", (req, res, next) => {
  // in die DB auslagern
  const posts = [
    {
      id: "fa3e4sdf2fe",
      title: "First Server-side post",
      content: "This is coming from my server",
    },
    {
      id: "asdfg92jrfe",
      title: "Second Server-side post",
      content: "This is coming from my local server",
    },
  ];

  res.status(200).json({
    message: "Post fetched successfully!",
    posts: posts,
  });
});

module.exports = app;
