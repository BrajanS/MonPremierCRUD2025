import express from "express";
import { router } from "./routes/router.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use("", router);

app.listen(port, (err) => {
  console.clear();
  console.info(`Server has started at: http://localhost:${port}`);
  if (err) {
    console.error("Couldn't start:", err);
  }
});
