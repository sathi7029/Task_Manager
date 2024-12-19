import jwt from "jsonwebtoken";
import { userModel } from "../models/user.models.js";

export const authenticate = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ errors: "unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);
    req.user = await userModel.findById(decoded.userId); 
    if (!req.user) {
      return res.status(404).json({ errors: "User not found" });
    }
  } catch (error) {
    return res.status(401).json({ errors: "" + error.message });
  }

  next();
};
