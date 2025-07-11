const authService = require(`../services/authService`);
const logger = require(`../helpers/logger`);

// SIGNUP
const signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const { user, accessToken, refreshToken } = await authService.signup(
      email,
      password,
      username
    );

    // Set cookies for access and refresh tokens
    res.cookie(`accessToken`, accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === `production`,
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });

    res.cookie(`refreshToken`, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === `production`,
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });

    res.status(201).json({
      message: `Signup successfully. Please verify your email`,
      user,
    });
  } catch (error) {
    logger.error(`Error in signup: ${error.message}`);
    res.status(500).json({ message: `Internal server error ${error}` });
  }
};

// VERIFY
const verifyEmail = async (req, res) => {
  try {
    const { token, email } = req.query;
    const user = await authService.verifyEmail(token, email);

    res.status(200).json({
      message: `Email verified successfully`,
      user,
    });
  } catch (error) {
    logger.error(`Error in verifyEmail: ${error.message}`);
    res.status(500).json({ message: `Internal server error` });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const { user, accessToken, refreshToken } = await authService.login(
      identifier,
      password
    );

    // Set cookies for access and refresh tokens
    res.cookie(`accessToken`, accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === `production`,
      sameSite: `Strict`,
    });

    res.cookie(`refreshToken`, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === `production`,
      sameSite: `Strict`,
    });

    res.status(200).json({
      message: `Login successful`,
      user,
    });
  } catch (error) {
    logger.error(`Error in login: ${error.message}`);
    res.status(500).json({ message: `Internal server error` });
  }
};

// REFRESH
const refresh = require(`../middleware/validateToken`).validateRefreshToken;

// LOGOUT
const logout = (req, res) => {
  res.clearCookie(`accessToken`);
  res.clearCookie(`refreshToken`);
  res.status(200).json({ message: `Logout successful` });
};

module.exports = {
  signup,
  verifyEmail,
  login,
  refresh,
  logout,
};
