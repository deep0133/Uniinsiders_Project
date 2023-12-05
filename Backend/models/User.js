const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
  },
  avatar: {
    filename: String,
    path: String,
  },
  email: {
    type: String,
    unique: [true, "Email already exists"],
    require: [true, "Please enter an email"],
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: `Post`,
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: `user`,
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: `user`,
    },
  ],
  password: {
    type: String,
    required: [true, "Please enter a password"],
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET || "secret_key");
};

const User = mongoose.model("user", userSchema);
module.exports = User;
