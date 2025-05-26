const cartService = require("../services/cartService");
const logger = require("../helpers/logger");

const getCartItems = async (req, res) => {
  try {
    const { userId } = req.user;
    const sessionId = req.cookies.sessionId;

    const cart = await cartService.getUserCart(userId, sessionId);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    logger.error("Error fetching cart items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addItemToCart = async (req, res) => {
  try {
    const { userId } = req.user;
    const sessionId = req.cookies.sessionId;
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ message: "Product ID and quantity are required" });
    }

    const cartItem = await cartService.addItemToCart(
      userId,
      { productId, quantity },
      sessionId
    );

    res.status(201).json(cartItem);
  } catch (error) {
    logger.error("Error adding item to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (!quantity) {
      return res.status(400).json({ message: "Quantity is required" });
    }

    const updatedItem = await cartService.updateCartItem(itemId, quantity);

    if (!updatedItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    logger.error("Error updating cart item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const removeItemFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;

    const deletedItem = await cartService.removeCartItem(itemId);

    if (!deletedItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json(deletedItem);
  } catch (error) {
    logger.error("Error removing item from cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getCartItems,
  addItemToCart,
  updateCartItem,
  removeItemFromCart,
};
