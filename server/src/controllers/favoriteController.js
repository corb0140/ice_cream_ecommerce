const favoritesService = require("../services/favoritesService");
const logger = require("../helpers/logger");

const getUserFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    const favorites = await favoritesService.getUserFavorites(userId);
    res.status(200).json(favorites);
  } catch (error) {
    logger.error("Error fetching user favorites:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;
    const favorite = await favoritesService.addFavorite(userId, productId);
    res.status(201).json(favorite);
  } catch (error) {
    logger.error("Error adding favorite:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const removeFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    const favorite = await favoritesService.removeFavorite(userId, productId);
    if (!favorite) {
      return res.status(404).json({ error: "Favorite not found" });
    }
    res.status(200).json(favorite);
  } catch (error) {
    logger.error("Error removing favorite:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getUserFavorites,
  addFavorite,
  removeFavorite,
};
