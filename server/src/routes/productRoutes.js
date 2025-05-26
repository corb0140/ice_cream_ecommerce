const { Router } = require("express");
const { authenticate, authorize } = require("../middleware/authMiddleware");
const productController = require("../controllers/productController");

const router = Router();

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

// ADMIN ROUTES
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  productController.createProduct
);
router.put(
  "/:id",
  authenticate,
  authorize(["admin"]),
  productController.updateProduct
);
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  productController.deleteProduct
);

module.exports = router;
