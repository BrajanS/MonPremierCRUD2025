function logger(req, res, next) {
  console.info("Middleware:", req.path);
  next();
}

function readJson(req, res, next) {
  console.info("Middleware:", req.body);
  next();
}

export { logger, readJson };
