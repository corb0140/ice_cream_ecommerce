const crypto = require("crypto");

// generate a verification token
const verificationToken = crypto.randomBytes(32).toString("hex");
const tokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

module.exports = {
  verificationToken,
  tokenExpires,
};
