// Importing All the Dependencies
import dotenv from "dotenv";
import express from "express";
import dbConnect from "./db/db.config.js"; // Importing dbConnect
import userRoute from "./routes/userauthRoute.js";
import todoRoutes from "./routes/todo.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
// Middleware to parse JSON requests
app.use(cookieParser());

app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Route to handle GET requests at root
app.get("/", (req, res) => {
  res.send({ message: "GET request to /api/ successful!" });
});

dotenv.config(); // Loading environment variables
dbConnect(app); // Connecting to the database

// Registering the user authentication route
app.use("/api/users", userRoute);
app.use(todoRoutes);
