import UserAll from "../entity/user.model";
import UserRepository from "../repository/user.repository";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";

type User = Omit<UserAll, "id">;

export async function register(user: User): Promise<string> {
  const existingUser = await UserRepository.getUserByEmail(user.email);
  if (existingUser) {
    throw new Error("Email already exists");
  }

  const newUser = await UserRepository.createUser(user);
  return generateToken(newUser);
}

export async function login(email: string, password: string): Promise<string> {
  const user = await UserRepository.getUserByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  return generateToken(user);
}

function generateToken(user: UserAll): string {
  dotenv.config();
  const payload = { id: user.id, email: user.email };
  return jwt.sign(payload, process.env.JWT_Key ?? "dalf", {
    expiresIn: "2h",
  });
}

export default { register, login };
