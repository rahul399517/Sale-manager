const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const PostModel = require("../models/Post_model");
const protectedRoute = require("../middleware/protectedResource");
//Create a new post
router.post("/createpost", protectedRoute, (req, res) => {
  const { productName, productCost, quantity } = req.body;
  if (!productName || !productCost || !quantity) {
    return res.status(400).json({ error: "Please enter mandatory fields" });
  }
  req.user.password = undefined;
  const postObj = new PostModel({
    productName: productName,
    productCost: productCost,
    quantity: quantity,

    author: req.user,
  });
  postObj
    .save()
    .then((newPost) => {
      res.status(201).json({ post: newPost });
    })
    .catch((error) => {
      console.log(error);
    });
});
//To delete Post
router.delete("/deletepost/:postId", protectedRoute, (req, res) => {
  PostModel.findOne({ _id: req.params.postId })
    .populate("author", "_id")
    .exec((error, postFound) => {
      if (error || !postFound) {
        return res.status(400).json({ error: "Post does not exist" });
      }
      //Check if the post author is same as logged in user , only then allow deletion
      if (postFound.author._id.toString() === req.user._id.toString()) {
        postFound
          .remove()
          .then((data) => {
            res.status(200).json({ result: data });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
});
//All posts only from logged in user
router.get("/myallposts", protectedRoute, (req, res) => {
  PostModel.find({ author: req.user._id })
    .populate("author", "_id fullName profileImg")
    .then((dbPosts) => {
      res.status(200).json({ posts: dbPosts });
    })
    .catch((error) => {
      console.log(error);
    });
});
module.exports = router;
