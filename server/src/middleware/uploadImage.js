const multer = require("multer");

const uploadImage = multer({
  storage: multer.memoryStorage(),
});

module.exports = uploadImage.single("image"); // 'image' is the field name in the form data
