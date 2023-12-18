const express = require("express");
const bodyParser = require("body-parser");
const mongoos = require("mongoose");

const Post = require("./models/post");

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
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE , OPTIONS"
  );
  // Pass to next layer of middleware
  next();
});

// POST
app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  console.log(post);
  post.save().then((createdPost) => {
    res.status(201).json({
      message: "Post added successfully",
      postID: createdPost._id,
    });
  });
});

// GET
app.get("/api/posts", (req, res, next) => {
  Post.find()
    .then((documents) => {
      res.status(200).json({
        message: "Post fetched successfully!",
        posts: documents,
      });
    })
    .catch((err) => console.log("Error: ", err.message));
});

app.delete("/api/posts/:id", (req, res, next) => {
  console.log(req.params.id);
  Post.deleteOne({ _id: req.params.id })
    .then((result) => {
      console.log("Post delete successfully!: ", result);
      res.status(200).json({ message: "Post deleted!" });
    })
    .catch((err) => console.log("Post delete failed!: ", err.message));
});

module.exports = app;
