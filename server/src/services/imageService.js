// services/imageService.js
const { Storage } = require("@google-cloud/storage");
const path = require("path");
const uuid = require("uuid").v4;
const pool = require("../config/db");

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

const saveImageToUser = async (image_url, user_id) => {
  const { rows } = await pool.query(
    "INSERT INTO profile_images (user_id, image_url) VALUES ($1, $2) RETURNING *",
    [user_id, image_url]
  );

  return rows[0];
};

const updateUserImage = async (image_url, user_id) => {
  const { rows } = await pool.query(
    "UPDATE profile_images SET image_url = $1 WHERE user_id = $2 RETURNING *",
    [image_url, user_id]
  );

  return rows[0];
};

const getUserImage = async (user_id) => {
  const { rows } = await pool.query(
    "SELECT image_url FROM profile_images WHERE user_id = $1",
    [user_id]
  );

  return rows[0] ? rows[0].image_url : null;
};

module.exports = {
  uploadImage,
  saveImageToUser,
  updateUserImage,
  getUserImage,
};
