function logger(req, res, next) {
  console.log("Middleware Logger:", req, res);
  next();
}

export default logger;
