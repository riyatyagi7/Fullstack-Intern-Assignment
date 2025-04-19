import { Request, Response, NextFunction } from "express";
import { registerUserSchema } from "../validations/userValidation";
import prisma from "../prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validatedData = registerUserSchema.parse(req.body);

    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      res.status(409).json({ message: "User already exists" });
      return;
    }

    
    const hashedPassword = await bcrypt.hash(validatedData.password, 10); 

    const newUser = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "User registered", user: newUser });
  } catch (error) {
    next(error);
  }
};
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
    
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    next(error);
  }
};








