const authService = require(`../services/authService`);
const logger = require(`../helpers/logger`);

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

const login = async (res, req) => {
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

module.export = {
  signup,
  login,
};
