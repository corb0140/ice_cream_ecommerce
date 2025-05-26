const { Router } = require("express");
const cartController = require("../controllers/cartController");
const { authenticate } = require("../middleware/authMiddleware");

const router = Router();

router.get("/", authenticate, cartController.getCartItems);
router.post("/", authenticate, cartController.addItemToCart);
router.put("/:itemId", authenticate, cartController.updateCartItem);
router.delete("/:itemId", authenticate, cartController.removeItemFromCart);

module.exports = router;
