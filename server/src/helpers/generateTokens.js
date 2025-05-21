const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: `${process.env.ACCESS_TOKEN_EXPIRATION}m`,
    }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: `${process.env.REFRESH_TOKEN_EXPIRATION}d`,
    }
  );
};

module.export = {
  generateAccessToken,
  generateRefreshToken,
};
