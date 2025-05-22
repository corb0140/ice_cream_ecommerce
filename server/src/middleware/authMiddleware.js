const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.cookie.accessToken;
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = decoded;
    next(); // pass the execution to the next middleware
  });
};

/**
 * @description This is a curried function (a function that returns another function), commonly used in Express.js middleware for role-based authorization.
 * First arrow function takes roles as an argument and returns another function that takes req, res, and next as arguments.
 * The second arrow is the actual express middleware, the function checks if the user's role is included in the roles array.
 * If the user's role is not included, it sends a 403 Forbidden response.
 * If the user's role is included, it calls the next middleware function.
 */
const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};

module.exports = {
  authenticate,
  authorize,
};
