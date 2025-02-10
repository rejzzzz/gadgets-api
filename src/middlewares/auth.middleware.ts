import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";

interface AuthRequest extends Request {
  user?: { id: string; username: string };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access Denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, SECRET_KEY) as { id: string; username: string };
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid token." });
  }
};
