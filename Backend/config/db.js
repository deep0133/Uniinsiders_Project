const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

async function connectDB() {
  const url = process.env.DB_STRING || 'mongodb://127.0.0.1:27017/socialMedia'
  return await mongoose.connect(url);
}

module.exports = connectDB;
