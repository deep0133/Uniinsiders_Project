const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  caption: {
    type: String,
  },
  image: {
    filename: String,
    path: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: `user`,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: `user`,
    },
  ],
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: `user` },
      comment: { type: String, require: true },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
