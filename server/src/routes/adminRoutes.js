const { Router } = require("express");
const { authenticate, authorize } = require("../middleware/authMiddleware");

const router = Router();

router.get("/dashboard", authenticate, authorize(["admin"]), (req, res) => {
  res.json({ message: "Admin dashboard access granted" });
});

module.exports = router;
