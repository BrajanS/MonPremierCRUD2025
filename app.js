import "dotenv/config";
import express from "express";
import { router } from "./routes/router.js";

const app = express();
const port = process.env.expressPort;

app.use(express.json());

app.use("", router);

app.listen(port, (err) => {
  console.info(`Server has started at: http://localhost:${port}`);
  if (err) {
    console.error("Couldn't start:", err);
  }
});
