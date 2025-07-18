import "dotenv/config";
import mongoose from "mongoose";

const mongoDbPort = process.env.mongoDbPort;

const connectMongoDb = async () => {
  try {
    await mongoose.connect(`mongodb://127.0.0.1:${mongoDbPort}/firstCrud`);
    console.info("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

export default connectMongoDb;
