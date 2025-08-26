function logger(req, res, next) {
  console.info("Middleware:", req.path);
  next();
}

function readJson(req, res, next) {
  console.info("Middleware:", req.body);
  next();
}

const errorHandler = (err, _, res, next) => {
  console.error("Error occured:", err.name);
  switch (err.name) {
    case "DatabaseException":
      return res.status(500).json({
        message: "A database error has occured",
      });
    case "NotFoundException":
      return res.status(404).json({ message: "Data not found" });
    default:
      console.error(`Error ${err.name} is at ${err.stack.split("\n")[1]}`);
      return res.status(500).json({
        message: "An unexpected error occured",
      });
  }
};

export { logger, readJson, errorHandler };
