const pool = require("../config/db");
const imageService = require("../services/imageService"); // make sure this exists

const getUserFavorites = async (userId) => {
  const { rows: favorites } = await pool.query(
    "SELECT * FROM favorites WHERE user_id = $1",
    [userId]
  );

  if (favorites.length === 0) {
    return [];
  }

  const productIds = favorites.map((fav) => fav.product_id);

  const { rows: products } = await pool.query(
    `
      SELECT
        p.id,
        p.name,
        p.description,
        p.price,
        p.image_url
      FROM products p
      WHERE p.id = ANY($1::uuid[])
    `,
    [productIds]
  );

  const signedProducts = await Promise.all(
    products.map(async (product) => {
      const signedUrl = await imageService.getSignedImageUrl(product.image_url);
      const favorite = favorites.find((fav) => fav.product_id === product.id);
      return {
        ...product,
        image_url: signedUrl,
        favoriteId: favorite.id,
      };
    })
  );

  return signedProducts;
};

const addFavorite = async (userId, productId) => {
  await pool.query(
    "INSERT INTO favorites (user_id, product_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
    [userId, productId]
  );

  const { rows } = await pool.query(
    "SELECT * FROM favorites WHERE user_id = $1 AND product_id = $2",
    [userId, productId]
  );

  return rows[0];
};

const removeFavorite = async (userId, productId) => {
  const { rows } = await pool.query(
    "DELETE FROM favorites WHERE user_id = $1 AND product_id = $2 RETURNING *",
    [userId, productId]
  );

  return rows[0];
};

module.exports = {
  getUserFavorites,
  addFavorite,
  removeFavorite,
};
