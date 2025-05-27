const pool = require("../config/db");

const getUserCart = async (userId, sessionId) => {
  const { rows: cart } = await pool.query(
    "SELECT * FROM cart WHERE user_id = $1 AND session_id = $2",
    [userId, sessionId]
  );

  if (cart.length === 0) {
    return null;
  }

  const cartId = cart[0].id;

  const { rows: items } = await pool.query(
    "SELECT * FROM cart_items WHERE cart_id = $1",
    [cartId]
  );

  return {
    ...cart[0],
    items,
  };
};

const addItemToCart = async (userId, { productId, quantity }, sessionId) => {
  let cartId;

  const { rows } = await pool.query(
    "SELECT id FROM cart WHERE user_id = $1 AND session_id = $2",
    [userId, sessionId]
  );

  if (rows.length === 0) {
    const { rows: cartRows } = await pool.query(
      "INSERT INTO cart (user_id, session_id) VALUES ($1, $2) RETURNING *",
      [userId, sessionId]
    );
    cartId = cartRows[0].id;
  } else {
    cartId = rows[0].id;
  }

  // Check if the product already exists in the cart
  const { rows: itemRows } = await pool.query(
    "SELECT id, quantity FROM cart_items WHERE cart_id = $1 AND product_id = $2",
    [cartId, productId]
  );

  if (itemRows.length > 0) {
    // If the product exists, update the quantity
    const newQuantity = itemRows[0].quantity + quantity;
    const { rows: result } = await pool.query(
      "UPDATE cart_items SET quantity = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *",
      [newQuantity, itemRows[0].id]
    );

    return result[0];
  } else {
    // Add new item if product doesn't exist
    const { rows: result } = await pool.query(
      "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *",
      [cartId, productId, quantity]
    );

    return result[0];
  }
};

const updateCartItem = async (itemId, quantity) => {
  const { rows } = await pool.query(
    "UPDATE cart_items SET quantity = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *",
    [quantity, itemId]
  );

  if (rows.length === 0) {
    throw new Error("Item not found in cart");
  }

  return rows[0];
};

const removeItemFromCart = async (itemId) => {
  const { rows } = await pool.query(
    "DELETE FROM cart_items WHERE id = $1 RETURNING *",
    [itemId]
  );

  if (rows.length === 0) {
    throw new Error("Item not found in cart");
  }

  return rows[0];
};

module.exports = {
  getUserCart,
  addItemToCart,
  updateCartItem,
  removeItemFromCart,
};
