import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import { router } from "./routes/router.js";

const app = express();
const port = process.env.expressPort;
const mongoDbPort = process.env.mongoDbPort;

const connectMongoDb = async () => {
  try {
    await mongoose.connect(`mongodb://127.0.0.1:${mongoDbPort}`);
    console.info("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

app.use(express.json());

app.use("", router);

app.listen(port, (err) => {
  connectMongoDb();
  console.info(`Server has started at: http://localhost:${port}`);
  if (err) {
    console.error("Couldn't start:", err);
  }
});
