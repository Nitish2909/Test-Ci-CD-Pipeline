const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // attach user info to request
      next();
    } catch (err) {
      res.status(401);
      throw new Error("Invalid or expired token");
    }
  } else {
    res.status(401);
    throw new Error("Token missing");
  }
});

module.exports = validateToken;
