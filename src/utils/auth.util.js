const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

const generateToken = (user) => {
  return jwt.sign(user, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

module.exports = { generateToken };
