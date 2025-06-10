const { Router } = require("express");
const imageController = require("../controllers/imageController");
const uploadImage = require("../middleware/uploadImage");
const { authenticate } = require("../middleware/authMiddleware");

const router = Router();

router.post("/upload", authenticate, uploadImage, imageController.uploadImage);
router.put(
  "/update",
  authenticate,
  uploadImage,
  imageController.updateUserImage
);
router.get("/user", authenticate, imageController.getUserImage);

module.exports = router;
