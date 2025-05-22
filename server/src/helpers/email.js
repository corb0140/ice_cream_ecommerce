const nodemailer = require("nodemailer");
const logger = require("./logger");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const sendVerificationEmail = async (email) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Email Verification",
    text: "Please verify your email by clicking the link below.",
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    logger.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email");
  }
};

module.exports = {
  sendVerificationEmail,
};
