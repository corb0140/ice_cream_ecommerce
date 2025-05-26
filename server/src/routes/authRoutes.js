const { Router } = require("express");
const authController = require("../controllers/authController");

const router = Router();

router.post("/signup", authController.signup);
router.get("/verify-email", authController.verifyEmail);
router.post("/login", authController.login);
router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);

module.exports = router;
