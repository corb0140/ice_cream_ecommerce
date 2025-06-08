const imageService = require("../services/imageService");
const logger = require("../helpers/logger");

const uploadImage = async (req, res) => {
  try {
    const imageUrl = await imageService.uploadImage(req.file);
    res.status(200).json({ imageUrl });
  } catch (error) {
    logger.error("Image upload failed", error);
    res.status(500).json({ error: "Image upload failed" });
  }
};

module.exports = {
  uploadImage,
};
