const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo connect");
  } catch (err) {
    console.log("No connect" + err);
    process.exit();
  }
};

module.exports = connectDB;
