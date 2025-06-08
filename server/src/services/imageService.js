// services/imageService.js
const { Storage } = require("@google-cloud/storage");
const path = require("path");
const uuid = require("uuid").v4;

const keyFilePath = process.env.GOOGLE_STORAGE_KEY_FILE;

const storage = new Storage({
  keyFilename: keyFilePath,
  projectId: process.env.GOOGLE_CLOUD_PROJECT,
});

const bucket = storage.bucket(process.env.GOOGLE_CLOUD_BUCKET);

/**
 * Uploads a file to Google Cloud Storage
 * @param {object} file - multer file object
 * @returns {string} public URL of the uploaded file
 */
const uploadImage = async (file) => {
  if (!file) return reject("No file provided");

  const ext = path.extname(file.originalname);
  const gcsFileName = `${uuid()}${ext}`;
  const blob = bucket.file(gcsFileName);

  try {
    await blob.save(file.buffer, {
      resumable: false,
      metadata: {
        contentType: file.mimetype,
        predefinedAcl: "publicRead",
      },
    });

    return `https://storage.googleapis.com/${process.env.GOOGLE_CLOUD_BUCKET}/${gcsFileName}`;
  } catch (error) {
    console.error("Error uploading file to Google Cloud Storage:", error);
    throw new Error("Failed to upload image");
  }
};

module.exports = { uploadImage };
