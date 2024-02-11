// authMiddleware.ts

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { unless } from "express-unless";

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

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const verifyResponse = jwt.verify(
    token,
    process.env.arebia23423dkajefaefaefa2 ?? ""
  );

  if (!verifyResponse)
    return res.status(403).json({ message: "Invalid token" });

  req.user = verifyResponse as { id: number; email: string }; // Attach the user object to the request
  next();
}

authenticateToken.unless = unless;

export default authenticateToken;
