import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

console.log("db pass: ", process.env.DB_KEY);
const pool = new Pool({
  host: "localhost",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  user: "postgres",
  password: process.env.DB_KEY,
});

export default pool;
