import express from "express";
import { signUp, login, logout } from "../controller/user.controller.js";
const route = express.Router();

route.post("/", signUp);
route.post("/login", login);
route.get("/logout", logout);

export default route;
