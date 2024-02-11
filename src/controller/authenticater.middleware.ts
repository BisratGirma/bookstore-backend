// authMiddleware.ts

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { unless } from "express-unless";
import dotenv from "dotenv";

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        name?: string;
      };
    }
  }
}

const secret = process.env.JWT_Key ?? "dalf";

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    console.log("sercet: ", secret);
    const verifyResponse = jwt.verify(token, secret);

    if (!verifyResponse)
      return res.status(403).json({ message: "Invalid token" });

    req.user = verifyResponse as { id: number; email: string }; // Attach the user object to the request
    next();
  } catch (error: any) {
    console.log(error.message);
    return res.status(401).json({ message: "auth server error" });
  }
}

authenticateToken.unless = unless;

export default authenticateToken;
