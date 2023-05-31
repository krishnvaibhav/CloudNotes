const mongoose = require("mongoose");
const mangooseUri = "mongodb://localhost:27017/";

const connectMongoose = async () => {
  await mongoose.connect(mangooseUri);
  console.log("connected successfully");
};

module.exports = connectMongoose;
