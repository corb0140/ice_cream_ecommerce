const imageService = require("../services/imageService");
const logger = require("../helpers/logger");

const uploadImage = async (req, res) => {
  try {
    const user_id = req.user.id;
    const file = req.file;

    if (!file) return res.status(400).json({ error: "No file uploaded" });

    // const imageUrl = await imageService.uploadImage(req.file);
    const fileName = await imageService.uploadImage(file);
    const savedImage = await imageService.saveImageToUser(fileName, user_id);

    const signedUrl = await imageService.getSignedImageUrl(
      savedImage.image_url
    );

    res.status(200).json({ imageUrl: signedUrl });
  } catch (error) {
    logger.error("Image upload failed", error);
    res.status(500).json({ error: "Image upload failed" });
  }
};

const updateUserImage = async (req, res) => {
  try {
    const user_id = req.user.id;
    const file = req.file;

    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const fileName = await imageService.uploadImage(file);
    const imageUrl = await imageService.updateUserImage(fileName, user_id);
    const signedUrl = await imageService.getSignedImageUrl(imageUrl.image_url);

    res.status(200).json({ imageUrl: signedUrl });
  } catch (error) {
    logger.error("Failed to update user image", error);
    res.status(500).json({ error: "Failed to update user image" });
  }
};

const getUserImage = async (req, res) => {
  try {
    const user_id = req.user.id;

    const signedUrl = await imageService.getUserImage(user_id);

    if (!signedUrl) {
      return res.status(404).json({ error: "User image not found" });
    }

    res.status(200).json({ imageUrl: signedUrl });
  } catch (error) {
    logger.error("Failed to get user image", error);
    res.status(500).json({ error: "Failed to get user image" });
  }
};

module.exports = {
  uploadImage,
  updateUserImage,
  getUserImage,
};
