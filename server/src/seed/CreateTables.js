const pool = require("../config/db");
const logger = require("../helpers/logger");

const createUsersTable = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            email VARCHAR(255) NOT NULL,
            username VARCHAR(50) NOT NULL UNIQUE,
            password TEXT NOT NULL,
            role VARCHAR(50) DEFAULT 'user',
            verified BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);
};

const createProductsTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT,
    stock INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
};

const createCartTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS cart (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    session_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
};

const createCartItemsTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cart_id UUID REFERENCES cart(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (cart_id, product_id) -- Ensures unique product in cart so it doesn't duplicate
    )`);
};

const seedAllTables = async () => {
  try {
    await createUsersTable();
    await createProductsTable();
    await createCartTable();
    await createCartItemsTable();
    logger.info("All tables created successfully");
  } catch (error) {
    logger.error("Error creating tables:", error);
  } finally {
    await pool.end();
  }
};

seedAllTables();
