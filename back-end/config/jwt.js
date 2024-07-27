const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.user,
    role: user.role,
  };
  const options = {
    expiresIn: "7d",
    algorithm: "HS256",
  };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, options);
};

const generateRefreshToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.user,
    role: user.role,
  };
  const options = {
    expiresIn: "15d",
    algorithm: "HS256",
  };
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, options);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
