const pool = require("../config/db");

const getAllProducts = async () => {
  const { rows } = await pool.query("SELECT * FROM products");

  return rows;
};

const getProductById = async (id) => {
  const { rows } = await pool.query("SELECT * FROM products WHERE id = $1", [
    id,
  ]);

  return rows[0];
};

/**
 * Returning * will perform the insert operation as normal and return the inserted row.
 */
const createProduct = async ({ name, description, price, image_url }) => {
  const { rows } = await pool.query(
    "INSERT INTO products (name, description, price, image_url) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, description, price, image_url]
  );

  return rows[0];
};

const updateProduct = async (id, { name, description, price, image_url }) => {
  const { rows } = await pool.query(
    "UPDATE products SET name = $1, description = $2, price = $3, image_url = $4 WHERE id = $5 RETURNING *",
    [name, description, price, image_url, id]
  );

  return rows[0];
};

const deleteProduct = async (id) => {
  await pool.query("DELETE FROM products WHERE id = $1 RETURNING *", [id]);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
