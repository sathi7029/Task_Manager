import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          userName,
          password,
        },
        { withCredentials: true }
      );

      // Show success message
      toast.success(data.message || "User logged in successfully");

      // Save token and navigate
      localStorage.setItem("jwt", data.token);
      navigateTo("/");

      // Clear input fields
      setUserName("");
      setPassword("");
    } catch (error) {
      // Handle errors and show error message
      const errorMessage = error.response?.data?.errors || "User login failed";
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold mb-2 text-center">Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">UserName</label>
              <input
                type="text"
                placeholder="Enter Your UserName"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Password</label>
              <input
                type="password"
                placeholder="Enter Your Password"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white hover:bg-blue-900 duration-300 rounded-xl font-semibold p-3"
            >
              Login
            </button>
            <p className="mt-4 text-center text-gray-600">
              Do not have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Signup
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
