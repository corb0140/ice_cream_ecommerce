const productService = require("../services/productService");
const imageService = require("../services/imageService");
const logger = require("../helpers/logger");

const getAllProducts = async (_req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    logger.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

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
  try {
    const { name, description, price, stock } = req.body;
    const file = req.file;

    if (!name || !description || !price || !stock) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!file)
      return res.status(400).json({ message: "Image file is required" });

    // Upload image to Google Cloud Storage
    const image_url = await imageService.uploadImage(file);
    const signedUrl = await imageService.getSignedImageUrl(image_url);

    const newProduct = await productService.createProduct({
      name,
      description,
      price,
      stock,
      image_url,
    });

    res.status(201).json({ newProduct, imageUrl: signedUrl });
  } catch (error) {
    logger.error("Error creating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;
    const file = req.file;

    const currentProduct = await productService.getProductById(id);
    if (!currentProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updateFields = {};
    if (name !== undefined) updateFields.name = name;
    if (description !== undefined) updateFields.description = description;
    if (price !== undefined) updateFields.price = price;
    if (stock !== undefined) updateFields.stock = stock;

    let signedUrl;

    if (file) {
      const image_url = await imageService.uploadImage(file);
      signedUrl = await imageService.getSignedImageUrl(image_url);
      updateFields.image_url = image_url;
    } else if (currentProduct.image_url) {
      // If no new image is uploaded, keep the existing image URL
      updateFields.image_url = currentProduct.image_url;
    }
    const updatedProduct = await productService.updateProduct(id, updateFields);

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // If no new image was uploaded, get the existing image URL
    if (updatedProduct.image_url) {
      try {
        signedUrl = await imageService.getSignedImageUrl(
          updatedProduct.image_url
        );
      } catch (error) {
        console.warn("Could not generate signed URL for image:", error);
        signedUrl = updatedProduct.image_url; // Fallback to stored URL
      }
    }

    // Return the updated product and the signed URL for the image
    const productWithSignedUrl = {
      ...updatedProduct,
      image_url: signedUrl || updatedProduct.image_url,
    };

    res.status(200).json({
      updatedProduct: productWithSignedUrl,
      imageUrl: signedUrl || updatedProduct.image_url,
    });
  } catch (error) {
    logger.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await productService.deleteProduct(id);
    res.status(201).json(`Product with ${id} successfully deleted `);
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
