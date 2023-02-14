const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const postSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productCost: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },

  author: {
    type: ObjectId,
    Ref: "UserModel",
  },
});
const PostModel = mongoose.model("PostModel", postSchema);
module.exports = PostModel;
