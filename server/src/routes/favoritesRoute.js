const { Router } = require("express");
const favoritesController = require("../controllers/favoriteController");
const { authenticate } = require("../middleware/authMiddleware");

const router = Router();

router.get("/", authenticate, favoritesController.getUserFavorites);
router.post("/", authenticate, favoritesController.addFavorite);
router.delete("/:productId", authenticate, favoritesController.removeFavorite);

module.exports = router;
