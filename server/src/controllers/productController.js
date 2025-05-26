const productService = require("../services/productService");
const logger = require("../helpers/logger");

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    logger.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productService.getProductById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    logger.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createProduct = async (req, res) => {
  const { name, description, price, image_url } = req.body;

  try {
    const newProduct = await productService.createProduct({
      name,
      description,
      price,
      image_url,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    logger.error("Error creating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, image_url } = req.body;

  try {
    const updatedProduct = await productService.updateProduct(id, {
      name,
      description,
      price,
      image_url,
    });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    logger.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await productService.deleteProduct(id);
    res.status(204).send();
  } catch (error) {
    logger.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
