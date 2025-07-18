import "dotenv/config";
import express from "express";
import { router } from "./routes/router.js";
import connectMongoDb from "./database/connectDb.js";

/** @type {import("express").Express} */
const app = express();

/** @type {Number} */
const port = process.env.expressPort;

app.use(express.json());

app.use("", router);

/**
 * Starts the Express server.
 * @function
 * @param {Error} [err] - [Optional] Error message if the server doesn't connect to DB.
 */
app.listen(port, (err) => {
  connectMongoDb();
  console.info(`Server has started at: http://localhost:${port}`);
  if (err) {
    console.error("Couldn't start:", err);
  }
});
