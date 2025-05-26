const { Router } = require("express");
const { authenticate } = require("../middleware/authMiddleware");

const router = Router();

router.get("/profile", authenticate, (req, res) => {
  res.json({ message: `User profile access granted`, user: req.user });
});

module.exports = router;
