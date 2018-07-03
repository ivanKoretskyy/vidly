function log(req, res, next) {
  console.log("loggign: " + req.toString())
  next();
}

module.exports = log