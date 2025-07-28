import "dotenv/config";
import express from "express";
import routes from "./routes/router.js";
import connectDb from "./database/connectDb.js";
import UserController from "./core/users/user.controller.js";
import UserService from "./core/users/user.service.js";
import UserRepository from "./core/users/repository/user.repository.js";

const app = express();

/**
 * Port number for the Express Server
 * @type {Number}
 */
const port = process.env.expressPort;

app.use(express.json());

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

app.use("", routes(userController));

/**
 * Starts the Express server.
 * @function
 * @param {Error} [err] - [Optional] Error message if the server doesn't connect to DB.
 */
app.listen(port, async (err) => {
  await connectDb();
  console.info(`Server has started at: http://localhost:${port}`);
  if (err) {
    console.error("Couldn't start:", err);
  }
});
