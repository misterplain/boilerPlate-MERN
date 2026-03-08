const mongoose = require("mongoose");
const logger = require("../utils/logger");
require("dotenv").config();

const connectDB = async () => {
  mongoose.set("strictQuery", false);

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error("MongoDB connection failed", {
      error: error.message,
      stack: error.stack,
      mongoUri: process.env.MONGO_URI ? "[CONFIGURED]" : "[MISSING]",
    });
    process.exit(1);
  }
};

module.exports = connectDB;
