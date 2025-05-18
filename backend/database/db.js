const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
  }
);

// Load models (make sure this comes AFTER `sequelize` is defined)
require('../models/User');

// Connect and sync
sequelize.authenticate()
  .then(() => {
    console.log("✅ Connected to PostgreSQL via Sequelize");
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log("✅ Models synchronized with the database");
  })
  .catch(err => {
    console.error("❌ Failed to connect or sync with Sequelize:", err);
  });

module.exports = sequelize;
