const jwt = require("jsonwebtoken");
const logger = require("../lib/logger");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).send("Access denied. No auth token provided.");
  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid auth token");
  }
};

module.exports = auth;
