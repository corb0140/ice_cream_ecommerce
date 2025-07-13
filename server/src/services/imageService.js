// services/imageService.js
const { Storage } = require("@google-cloud/storage");
const path = require("path");
const uuid = require("uuid").v4;
const pool = require("../config/db");

// const keyFilePath = process.env.GOOGLE_STORAGE_KEY_FILE;

const credentials = {
  type: process.env.GC_TYPE,
  project_id: process.env.GC_PROJECT_ID,
  private_key_id: process.env.GC_PRIVATE_KEY_ID,
  private_key: process.env.GC_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: process.env.GC_CLIENT_EMAIL,
  client_id: process.env.GC_CLIENT_ID,
};

const storage = new Storage({
  credentials,
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
      },
    });

    return gcsFileName;
  } catch (error) {
    console.error("❌ Upload failed.");
    console.error("Message:", error.message);
    console.error("Code:", error.code || "N/A");
    console.error("Errors:", error.errors || "N/A");
    console.error("Stack:", error.stack);
    throw new Error("Failed to upload image");
  }
};

const getSignedImageUrl = async (fileName) => {
  const file = bucket.file(fileName);

  try {
    const [url] = await file.getSignedUrl({
      action: "read",
      expires: Date.now() + 24 * 60 * 60 * 1000, // 1 day
    });

    return url;
  } catch (error) {
    console.error("Error getting signed URL:", error);
    throw new Error("Failed to get signed URL");
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

  if (!rows[0]) return null;
  const signedUrl = await getSignedImageUrl(rows[0].image_url);

  return signedUrl;
  // return rows[0] ? rows[0].image_url : null;
};

module.exports = {
  uploadImage,
  getSignedImageUrl,
  saveImageToUser,
  updateUserImage,
  getUserImage,
};
