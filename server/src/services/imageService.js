// services/imageService.js
const { Storage } = require("@google-cloud/storage");
const path = require("path");
const uuid = require("uuid").v4;

const keyFilePath = process.env.GCLOUD_STORAGE_KEY_FILE;

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
  return new Promise((resolve, reject) => {
    if (!file) return reject("No file provided");

    const ext = path.extname(file.originalname);
    const gcsFileName = `${uuid()}${ext}`;
    const blob = bucket.file(gcsFileName);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on("error", (err) => reject(err));

    blobStream.on("finish", async () => {
      // Make the file public
      await blob.makePublic();
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${gcsFileName}`;
      resolve(publicUrl);
    });

    blobStream.end(file.buffer);
  });
};

module.exports = { uploadImage };
