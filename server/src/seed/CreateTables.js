const pool = require("../config/db");
const logger = require("../helpers/logger");

const createUsersTable = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            email VARCHAR(255) NOT NULL,
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`);
};

const createCartsTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS carts (
    ID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_ID UUID REFERENCES users(id) ON DELETE CASCADE,
    session_id VARCHAR(255) NOT NULL,
    items JSONB DEFAULT '[]',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
};

const seedAllTables = async () => {
  try {
    await createUsersTable();
    await createProductsTable();
    await createCartsTable();
    logger.info("All tables created successfully");
  } catch (error) {
    logger.error("Error creating tables:", error);
  } finally {
    await pool.end();
  }
};

seedAllTables();
