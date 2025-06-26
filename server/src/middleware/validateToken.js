const jwt = require("jsonwebtoken");

const validateRefreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken)
    return res.status(401).json({ message: "No refresh token provided" });

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid refresh token" });

    const newAccessToken = jwt.sign(
      { id: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: `${process.env.ACCESS_TOKEN_EXPIRES_IN}m`,
      }
    );
    res.cookie("accessToken", newAccessToken, { httpOnly: true });
    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      accessToken: newAccessToken,
      message: "New access token generated",
    });
  });
};

module.exports = {
  validateRefreshToken,
};
