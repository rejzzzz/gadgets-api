import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt, {SignOptions} from 'jsonwebtoken';
import { authReq, loginReqBody, registerReqBody, authError } from '../types/auth.types';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const jwtSecret = process.env.JWT_SECRET as string;
const jwtExpiry = '1d';

export const loginUser = async (req: authReq, res: Response): Promise<void> => {
  try {
    const { email, password }: loginReqBody = req.body;

    if (!email || !password) {
      throw new authError('Email and password are required', 400);
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new authError('Invalid credentials', 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new authError('Invalid credentials', 401);
    }



    if (!jwtSecret) {
      throw new authError('JWT_SECRET missing', 500);
    }

    const options: SignOptions = { expiresIn: jwtExpiry};

    const token = jwt.sign(
    { id: user.id, email: user.email },
    jwtSecret,
    options
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email
      }
    });
  } catch (error) {
    if (error instanceof authError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

export const registerUser = async (req: authReq, res: Response): Promise<void> => {
  try {
    const { email, password, confirmPassword }: registerReqBody = req.body;

    if (!email || !password || !confirmPassword) {
      throw new authError('All fields are required', 400);
    }

    if (password !== confirmPassword) {
      throw new authError('Passwords do not match', 400);
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new authError('Email already registered', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword
      }
    });

    

    if (!jwtSecret) {
      throw new authError('JWT configuration missing', 500);
    }

    const options: SignOptions = { expiresIn: jwtExpiry };

    const token = jwt.sign(
    { id: user.id, email: user.email },
    jwtSecret,
    options
    );


    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email
      }
    });
  } catch (error) {
    if (error instanceof authError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};