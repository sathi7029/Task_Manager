//importing the dependencies

import { userModel } from "../models/user.models.js";

import { generateTokenAndSaveInCookies } from "../jwt/token.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { z } from "zod";

const userSchema = z.object({
  userName: z.string().min(3, { message: "username altest 3 character long" }),
  password: z.string().min(4, { message: "atleast give 4 character long" }),
});

dotenv.config();

//sign Up

export const signUp = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password)
      return res.status(400).json({ message: "All fields are required" });

    const validation = userSchema.safeParse({ userName, password });
    if (!validation.success) {
      const errorMessage = validation.error.errors.map((err) => err.message);
      return res.status(400).json({ errors: errorMessage });
    }

    const existingUser = await userModel.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({
        errors: "user is already Present.Try with another username",
      });
    }

    let hashPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      userName,
      password: hashPassword,
    });
    return res
      .status(200)
      .json({ message: "user is succesfully Register", newUser });
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};

//login
export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password)
      return res.status(400).json({ message: "All fields are required" });

    const existingUser = await userModel.findOne({ userName });
    if (!existingUser) {
      return res.status(404).json({ errors: "User not found" });
    }

    const isValid = await bcrypt.compare(password, existingUser.password);
    if (!isValid) {
      return res.status(401).json({ errors: "Invalid password" });
    }

    const token = await generateTokenAndSaveInCookies(existingUser._id, res);

    return res.status(200).json({ message: "Login Successful", token });
  } catch (error) {
    console.error("Failed to login user:", error.message);
    return res.status(500).json({ errors: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      path: "/",
    });
    return res.status(200).json({ message: "User logged out succesfully..." });
  } catch (error) {
    return res.status(500).json({ errors: "Error in logout" });
  }
};
