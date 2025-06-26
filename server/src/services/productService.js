const pool = require("../config/db");
const { getSignedImageUrl } = require("./imageService");

const getAllProducts = async () => {
  const { rows } = await pool.query("SELECT * FROM products");

  // Map through the rows to get signed URLs for images
  for (const product of rows) {
    if (product.image_url) {
      product.image_url = await getSignedImageUrl(product.image_url);
    }
  }

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
const createProduct = async ({
  name,
  description,
  price,
  stock,
  image_url,
}) => {
  const existingProduct = await pool.query(
    "SELECT * FROM products WHERE LOWER(name) = LOWER($1)",
    [name]
  );

  if (existingProduct.rows.length > 0) {
    throw new Error(`Product with this name "${name}" already exists`);
  }

  const { rows } = await pool.query(
    "INSERT INTO products (name, description, price, stock, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, description, price, stock, image_url]
  );

  const product = rows[0];

  return product;
};

const updateProduct = async (
  id,
  { name, description, price, stock, image_url }
) => {
  const { rows } = await pool.query(
    "UPDATE products SET name = $1, description = $2, price = $3, stock = $4, image_url = $5 WHERE id = $6 RETURNING *",
    [name, description, price, stock, image_url, id]
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
