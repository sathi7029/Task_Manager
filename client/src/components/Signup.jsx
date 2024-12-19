import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

function Signup() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users",
        {
          userName,
          password,
        },
        { withCredentials: true }
      );

      toast.success(data.message || "User registered successfully");
      localStorage.setItem("jwt", data.token);
      navigateTo("/login");
      setUserName("");
      setPassword("");
    } catch (error) {
      const errorMessage =
        error.response.data.errors || "User registration failed";
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold mb-2 text-center">Signup</h1>
          <form onSubmit={handleRegister}>
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
              Signup
            </button>
            <p className="mt-4 text-center text-gray-600">
              Already Have an Account{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
