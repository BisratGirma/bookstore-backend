import { isEmail } from "class-validator";
import { Request, Response } from "express";
import { isAlphanumeric } from "validator";

import Auth from "../service/user.service";

const errorResponse = (error: any) => {
  return {
    error: true,
    message: error.message,
    data: null,
    status: error.status ?? 400,
  };
};

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    console.log(email, password);

    if (!isEmail(email) || typeof password !== "string") {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const loginRuslt = await Auth.login(email, password);

    res.status(200).json({ message: "Login successful", token: loginRuslt });
    return;
  } catch (error: any) {
    res.status(error.status ?? 400).json(errorResponse(error));
  }
}

export async function register(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!isEmail(email) || typeof password !== "string") {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const registerRuslt = await Auth.register({ email, password });

    res.status(200).json({ message: "Login successful", token: registerRuslt });
    return;
  } catch (error: any) {
    res.status(error.status ?? 400).json(errorResponse(error));
  }
}
