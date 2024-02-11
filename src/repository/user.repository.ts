import pool from "../repository/db";
import User from "../entity/user.model";
import bcryptjs from "bcryptjs";

export async function createUser(user: Omit<User, "id">): Promise<User> {
  await pool.query(`CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        point INT DEFAULT 100
      )`);
  // Hash password before saving
  const hashedPassword = await bcryptjs.hash(user.password, 10);
  user.password = hashedPassword;

  const { rows } = await pool.query(
    "INSERT INTO users (email, password, point) VALUES ($1, $2, $3) RETURNING *",
    [user.email, user.password, user.point ?? 100]
  );

  return rows[0];
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  return rows[0] || null;
}

export default { createUser, getUserByEmail };
