import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Error from "./components/Error";
import { Toaster } from "react-hot-toast";

function App() {
  const token = localStorage.getItem("jwt");

  return (
    <>
      <div>
        <BrowserRouter>
          <Toaster />
          <Routes>
            <Route
              path="/"
              element={token ? <Home /> : <Navigate to={"/login"} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
