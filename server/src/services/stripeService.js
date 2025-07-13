const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (cartItems) => {
  return await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: cartItems.map((item) => ({
      price_data: {
        currency: "cad",
        product_data: {
          name: item.name,
          images: [item.image_url || ""],
          description: item.description,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    })),
    mode: "payment",
    success_url: `${process.env.VERCEL_URL}/checkout-success`,
    cancel_url: `${process.env.VERCEL_URL}/cart`,
  });
};

module.exports = {
  createCheckoutSession,
};
