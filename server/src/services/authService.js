const bcrypt = require("bcrypt");
const pool = require("../config/db");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../helpers/generateTokens");

const { sendVerificatioNEmail } = require("../helpers/sendVerificationEmail");

const signup = async (email, password, username) => {
  const hashPassword = await bcrypt.hash(password, 10);

  const { rows } = await pool.query(
    `INSERT INTO user (email, password, username) VALUES ($1, $2, $3) RETURNING *`,
    [email, hashPassword, username]
  );

  const user = rows[0];
  await sendVerificatioNEmail(user.email);

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
  login,
};
