import "dotenv/config";
import mongoose from "mongoose";
import mariadb from "mysql2/promise";

const mongoDbPort = process.env.mongoDbPort;

const connectDb = async (databaseType) => {
  if (databaseType === "mariadb") {
    try {
      const pool = mariadb.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });
      const [produits] = await pool.query("SELECT * FROM produits");
      console.info("MariaDB pool created !\nTEST Query:", produits);
      return pool;
    } catch (err) {
      const cleanError = {
        message: err.message,
        name: err.name,
        path: err.stack.split("\n")[1],
      };
      console.error("MariaDB poll error:", cleanError);
    }
  } else {
    // default DB is mongoDB
    try {
      await mongoose.connect(`mongodb://127.0.0.1:${mongoDbPort}/firstCrud`);
      console.info("MongoDB connected");
    } catch (err) {
      console.error("MongoDB connection error:", err);
    }
  }
};

export default connectDb;
