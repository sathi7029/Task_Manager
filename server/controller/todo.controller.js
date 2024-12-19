// todo.controller.js
import Todos from "../models/todo.models.js";

export const addTodo = async (req, res) => {
  try {
    const { title, completed } = req.body;

    // Basic validation
    if (!title) {
      return res.status(400).json({ message: "Title is required." });
    }

    const newTodo = new Todos({
      title,
      completed: completed || false,
      user: req.user._id, // Associate todo with logged-in user
    });

    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};

// Get all Todos
export const getTodos = async (req, res) => {
  try {
    const todos = await Todos.find({ user: req.user._id });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos." });
  }
};

// Get a single Todo by ID
export const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todos.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found." });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error fetching the todo." });
  }
};

// Update a Todo
export const statusChcek = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedTodo = await Todos.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found." });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "Error updating the todo." });
  }
};

// Delete a Todo
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todos.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found." });
    }

    res.status(200).json({ message: "Todo deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting the todo." });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedTodo = await Todos.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found." });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "Error updating the todo." });
  }
};
