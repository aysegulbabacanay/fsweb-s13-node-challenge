function logger(req, res, next) {
  const method = req.method;
  const url = req.originalUrl;
  const timestamp = new Date().toLocaleString();

  console.log(`[${timestamp} ${method}--${url}]`);

  next();
}

module.exports = logger;