import jwt from "jsonwebtoken";
import { userModel } from "../models/user.models.js";
export const generateTokenAndSaveInCookies = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  await userModel.findByIdAndUpdate(userId, { token });
  return token;
};
