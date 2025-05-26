const nodemailer = require("nodemailer");
const logger = require("./logger");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (email, verificationLink) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Email Verification",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333;">Welcome to Ice Cream Store!</h2>
        <p>Thank you for signing up. Please verify your email address by clicking the button below:</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationLink}" 
             style="background-color: #4CAF50; color: white; padding: 15px 30px; 
                    text-decoration: none; border-radius: 5px; display: inline-block;
                    font-weight: bold;">
            Verify Email Address
          </a>
        </div>
        
        <p>If the button doesn't work, copy and paste this link into your browser:</p>
        <p style="word-break: break-all; background-color: #f5f5f5; padding: 10px; border-radius: 3px;">
          <a href="${verificationLink}">${verificationLink}</a>
        </p>
        
        <p style="color: #666; font-size: 14px; margin-top: 30px;">
          This link will expire in 24 hours. If you didn't create an account, please ignore this email.
        </p>
      </div>
    `,
    // Plain text version as fallback
    text: `
Welcome to Ice Cream Store!

Thank you for signing up. Please verify your email address by visiting this link:

${verificationLink}

If you can't click the link, copy and paste it into your browser.

This link will expire in 24 hours. If you didn't create an account, please ignore this email.
    `,
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
