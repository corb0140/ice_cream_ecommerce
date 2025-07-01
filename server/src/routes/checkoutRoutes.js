const { Router } = require("express");
const checkoutController = require("../controllers/checkoutController");
const { authenticate } = require("../middleware/authMiddleware");

const router = Router();

router.post(
  "/create-checkout-session",
  authenticate,
  checkoutController.handleCreateCheckoutSession
);

module.exports = router;
