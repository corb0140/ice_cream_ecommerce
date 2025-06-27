const pool = require("../config/db");

const getUserCart = async (userId) => {
  const { rows: cart } = await pool.query(
    "SELECT * FROM cart WHERE user_id = $1",
    [userId]
  );

  if (cart.length === 0) {
    return null;
  }

  const cartId = cart[0].id;

  const { rows: items } = await pool.query(
    `
     SELECT
      ci.id AS id,
      ci.quantity,
      ci.updated_at,
      p.id AS product_id,
      p.name,
      p.description,
      p.price,
      p.image_url
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    WHERE ci.cart_id = $1
    `,
    [cartId]
  );

  return {
    ...cart[0],
    items,
  };
};

const addItemToCart = async (userId, { productId, quantity }) => {
  let cartId;

  const { rows } = await pool.query("SELECT id FROM cart WHERE user_id = $1", [
    userId,
  ]);

  if (rows.length === 0) {
    const { rows: cartRows } = await pool.query(
      "INSERT INTO cart (user_id) VALUES ($1) RETURNING id",
      [userId]
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

  let itemId;

  if (itemRows.length > 0) {
    const newQuantity = itemRows[0].quantity + quantity;
    const { rows: result } = await pool.query(
      "UPDATE cart_items SET quantity = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id",
      [newQuantity, itemRows[0].id]
    );
    itemId = result[0].id;
  } else {
    const { rows: result } = await pool.query(
      "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING id",
      [cartId, productId, quantity]
    );
    itemId = result[0].id;
  }

  // Fetch item + product data
  const { rows: data } = await pool.query(
    `
      SELECT
      ci.id AS id,
      ci.quantity,
      ci.updated_at,
      p.id AS product_id,
      p.name,
      p.description,
      p.price,
      p.image_url
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    WHERE ci.cart_id = $1
    `,
    [itemId]
  );

  return data[0];
};

const updateCartItem = async (itemId, quantity) => {
  const { rows } = await pool.query(
    "UPDATE cart_items SET quantity = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *",
    [quantity, itemId]
  );

  if (rows.length === 0) {
    throw new Error("Item not found in cart");
  }

  const { rows: data } = await pool.query(
    `
    SELECT
      ci.id AS id,
      ci.quantity,
      ci.updated_at,
      p.id AS product_id,
      p.name,
      p.description,
      p.price,
      p.image_url
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    WHERE ci.cart_id = $1
    `,
    [itemId]
  );

  return data[0];
};

const removeItemFromCart = async (itemId) => {
  // Check if item exists
  const { rows: cartItem } = await pool.query(
    "SELECT cart_id FROM cart_items WHERE id = $1",
    [itemId]
  );

  if (cartItem.length === 0) {
    console.log("No item found in cart_items with id:", itemId);
    throw new Error("Item not found in cart");
  }

  const cartId = cartItem[0].cart_id;

  await pool.query("DELETE FROM cart_items WHERE id = $1", [itemId]);

  const { rows: userRows } = await pool.query(
    "SELECT user_id FROM cart WHERE id = $1",
    [cartId]
  );

  return await getUserCart(userRows[0].user_id);
};

module.exports = {
  getUserCart,
  addItemToCart,
  updateCartItem,
  removeItemFromCart,
};
