import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

// Optional: cleaner query helper
export const query = (text, params) => pool.query(text, params);

// Test the connection
pool.query("SELECT NOW()", (err, res) => {
    if (err) {
        console.error("❌ Database connection failed:", err);
    } else {
        console.log("✅ Connected to PostgreSQL at", res.rows[0].now);
    }
});
