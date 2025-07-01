const { createCheckoutSession } = require("../services/stripeService");
const logger = require("../helpers/logger");

const handleCreateCheckoutSession = async (req, res) => {
  const { cartItems } = req.body;

  try {
    const session = await createCheckoutSession(cartItems);
    res.status(200).json({ url: session.url });
  } catch (error) {
    logger.error("Error creating checkout session:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  handleCreateCheckoutSession,
};
