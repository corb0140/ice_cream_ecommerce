const bcrypt = require("bcrypt");
const pool = require("../config/db");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../helpers/generateTokens");

const {
  verificationToken,
  tokenExpires,
} = require("../helpers/verificationToken");
const { sendVerificationEmail } = require(`../helpers/sendVerificationEmail`);

// SIGNUP
const signup = async (email, password, username) => {
  const { rows: existingUsers } = await pool.query(
    `SELECT EXISTS (SELECT 1 FROM users WHERE email = $1 OR username = $2)`,
    [email, username]
  );

  if (existingUsers[0].exists)
    throw new Error("User already exists with this email or username");

  const hashPassword = await bcrypt.hash(password, 10);

  const { rows } = await pool.query(
    `INSERT INTO users (email, password, username, verification_token, verification_token_expires) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [email, hashPassword, username, verificationToken, tokenExpires]
  );

  const user = rows[0];

  const verificationLink = `${
    process.env.CLIENT_URL
  }/verify-email?token=${verificationToken}&email=${encodeURIComponent(
    user.email
  )}`;

  await sendVerificationEmail(user.email, verificationLink);

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return {
    user,
    accessToken,
    refreshToken,
  };
};

// VERIFY EMAIL
const verifyEmail = async (token, email) => {
  const { rows } = await pool.query(
    `SELECT * FROM users WHERE email = $1 AND verification_token = $2 AND verification_token_expires > NOW()`,
    [email, token]
  );

  const user = rows[0];

  if (!user) {
    throw new Error("Invalid or expired verification token");
  }

  await pool.query(
    `UPDATE users SET verified = TRUE, verification_token = NULL, verification_token_expires = NULL WHERE email = $1`,
    [email]
  );

  return user;
};

const login = async (identifier, password) => {
  const { rows } = await pool.query(
    `SELECT * FROM users WHERE email = $1 OR username = $1`,
    [identifier]
  );

  const user = rows[0];

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return {
    user,
    accessToken,
    refreshToken,
  };
};

module.exports = {
  signup,
  verifyEmail,
  login,
};
