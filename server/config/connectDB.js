const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async () => {
  mongoose.set("strictQuery", false);
  console.log(process.env.MONGO_URI)

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(process.env.MONGO_URI)
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
