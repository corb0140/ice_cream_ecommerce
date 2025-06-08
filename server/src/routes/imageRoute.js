const { Router } = require("express");
const imageController = require("../controllers/imageController");
const uploadImage = require("../middleware/uploadImage");

const router = Router();

router.post("/upload", uploadImage, imageController.uploadImage);

module.exports = router;
