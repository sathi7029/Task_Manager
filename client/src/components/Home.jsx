import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // Add useNavigate for navigation

function Home() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const navigateTo = useNavigate(); 

  useEffect(() => {
    const fetchtodos = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/todos`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        setTodos(response.data);
        setError(null);
      } catch (error) {
        setError("Failed to fetch Todos");
      } finally {
        setLoading(false);
      }
    };
    fetchtodos();
  }, []);

  const todoCreate = async () => {
    if (!newTodo) return;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/todos`,
        { title: newTodo, completed: false },
        { withCredentials: true }
      );
      setTodos([...todos, response.data]);
      setNewTodo("");
    } catch (error) {
      setError("Failed to add todos");
    }
  };

  const todoStatus = async (id) => {
    const todo = todos.find((t) => t._id === id);
    if (!todo) return;

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/todos/${id}`,
        { ...todo, completed: !todo.completed },
        { withCredentials: true }
      );
      setTodos(todos.map((t) => (t._id === id ? response.data : t)));
    } catch (error) {
      setError("Failed to update Todo status");
    }
  };

  const todoDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/${id}`, {
        withCredentials: true,
      });
      setTodos(todos.filter((t) => t._id !== id));
    } catch (error) {
      setError("Failed to delete Todo");
    }
  };

  const todoUpdate = async (id) => {
    try {
      const updateData = prompt("Edit the task data");
      if (updateData) {
        const res = await axios.put(
          `${import.meta.env.VITE_BASE_URL}/${id}`,
          {
            title: updateData,
          },
          { withCredentials: true }
        );
        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo._id === id ? res.data : todo))
        );
      }
    } catch (error) {
      console.error("Error updating todo:", error);
      setError("Failed to update Todo");
    }
  };

  const logout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_BASE_URL}/api/users/logout`, {
        withCredentials: true,
      });
      toast.success("Logout Successfully");
      localStorage.removeItem("jwt");
      navigateTo("/login");
    } catch (error) {
      toast.error("Error in Logout");
    }
  };

  const remainingTodo = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="bg-gray-300 max-w-lg lg:max-w-xl rounded-lg mx-8 sm:mx-auto p-6 shadow-lg my-6">
      <h1 className="text-2xl font-semibold text-center">Tasks For Today</h1>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Add a new todo"
          className="flex-grow p-2 border rounded-l-md focus:outline-none"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          className="bg-blue-500 border rounded-r-md text-white px-4 py-2 hover:bg-blue-700 duration-300"
          onClick={todoCreate}
        >
          Add
        </button>
      </div>
      {loading ? (
        <div className="text-center justify-center">
          <span className="text-gray-500">Loading...</span>
        </div>
      ) : error ? (
        <div className="text-center text-red-600 font-semibold">{error}</div>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo, index) => (
            <li
              className="flex items-center justify-between p-3 bg-gray-300 rounded-md"
              key={todo._id || index}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => todoStatus(todo._id)}
                  className="mr-2"
                />
                <span
                  className={`${
                    todo.completed
                      ? "line-through text-gray-800 font-semibold"
                      : ""
                  } `}
                >
                  {todo.title}
                </span>
              </div>
              <div>
                <button
                  className="text-red-500 hover:text-red-800 duration-300 mr-2"
                  onClick={() => todoUpdate(todo._id)}
                >
                  Edit
                </button>

                <button
                  className="text-red-500 hover:text-red-800 duration-300"
                  onClick={() => todoDelete(todo._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-4 text-center text-sm text-gray-700">
        {remainingTodo} Todo Remaining
      </p>
      <button
        onClick={logout}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-800 mx-auto block"
      >
        Logout
      </button>
    </div>
  );
}

export default Home;
