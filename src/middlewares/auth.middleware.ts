import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authReq, authError } from '../types/auth.types';

export const verifyToken = async (
  req: authReq,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new authError('No token provided', 401);
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new authError('Invalid token format', 401);
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new authError('JWT secret not configured', 500);
    }

    try {
      const decoded = jwt.verify(token, jwtSecret) as { id: string; email: string };
      req.user = decoded;
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new authError('Token expired', 401);
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new authError('Invalid token', 401);
      }
      throw error;
    }
  } catch (error) {
    if (error instanceof authError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};