import express from "express";
import {
  addTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  statusChcek,
} from "../controller/todo.controller.js";

import { authenticate } from "../middleware/authorize.js";

const router = express.Router();

router.get("/test-auth", authenticate, (req, res) => {
  res.status(200).send("Middleware works!");
});

router.post("/todos", authenticate, addTodo); // Create a new Todo
router.get("/todos", authenticate, getTodos); // Get all Todos for a user
router.put("/todos/:id", authenticate, updateTodo); // Update Todo by ID
router.put("/todos/:id", authenticate, statusChcek);
router.delete("/todos/:id", authenticate, deleteTodo); // Delete Todo by ID

export default router;
