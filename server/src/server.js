const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("./helpers/logger");

// CONFIGURATIONS
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

// CORS CONFIGURATION
const allowedOrigins = [process.env.CLIENT_URL, process.env.VERCEL_URL];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
// app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

// IMPORT ROUTES
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const imageRoutes = require("./routes/imageRoute");
const checkoutRoutes = require("./routes/checkoutRoutes");
const favoritesRoutes = require("./routes/favoritesRoute");

// ROUTES
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/images", imageRoutes);
app.use("/checkout", checkoutRoutes);
app.use("/favorites", favoritesRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

// SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
