const authService = require(`../services/authService`);
const logger = require(`../helpers/logger`);

// SIGNUP
const signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const user = await authService.signup(email, password, username);
    res.status(201).json({
      message: `Signup successfully. Please verify your email`,
      user,
    });
  } catch {
    logger.error(`Error in signup: ${error.message}`);
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

    res.cookie(`accessToken`, accessToken, { httpOnly: true });
    res.cookie(`refreshToken`, refreshToken, { httpOnly: true });
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
  login,
  refresh,
  logout,
};
