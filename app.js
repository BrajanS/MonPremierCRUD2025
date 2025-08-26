import "dotenv/config";
import express from "express";
import routes from "./routes/router.js";
import connectDb from "./database/connectDb.js";
import getPool from "./database/mariadb_pool.js";
import UserController from "./core/users/user.controller.js";
import UserService from "./core/users/user.service.js";

// import UserRepository from "./core/users/repository/user.mariadb.repository.js";
import UserRepository from "./core/users/repository/user.mongodb.repository.js";
import { errorHandler } from "./middleware/middlewareTest.js";

const app = express();

/**
 * Port number for the Express Server
 * @type {Number}
 */
const port = process.env.expressPort;

app.use(express.json());

const pool = getPool();
const userRepository =
  process.env.TYPE_DB === "mariadb"
    ? new UserRepository(pool)
    : new UserRepository();

const userService = new UserService(userRepository);
const userController = new UserController(userService);

app.use("", routes(userController));

app.use(errorHandler);
/**
 * Starts the Express server.
 * @function
 * @param {Error} [err] - [Optional] Error message if the server doesn't connect to DB.
 */
app.listen(port, async (err) => {
  if (process.env.TYPE_DB === "mariadb") {
    console.info(`Server has started at: http://localhost:${port}`);
  } else {
    await connectDb();
    console.info(`Server has started at: http://localhost:${port}`);
    if (err) {
      console.error("Couldn't start:", err);
    }
  }
});
