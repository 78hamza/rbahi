import pkg from 'pg';
import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config({path : "/home/hamza-bouzian/rbahi/backend/.env"});

export const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});


pool.query("SELECT NOW()", (err, res) => {
    if (err) {
        console.error("database connection failed", err);
    }else{
        console.log("connected to PostgreSQL at", res.rows[0].now);
    }
})