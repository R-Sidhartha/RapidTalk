import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/chat-icon.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

export default function Register() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/");
      }
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center flex-col bg-gray-700">
        <form
          className="bg-gray-800 bg-opacity-70 rounded-lg p-10 flex flex-col items-center gap-8 w-11/12 md:w-2/3 lg:w-1/3 border-2 border-black shadow-xl shadow-black"
          action=""
          onSubmit={(event) => handleSubmit(event)}
        >
          <div className="flex items-center gap-4">
            <img src={Logo} alt="logo" className="h-20" />
            <h1 className="text-white text-3xl font-bold">RapidTalk</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            className="bg-transparent border border-gray-500 rounded-md p-4 w-full text-white focus:outline-none focus:border-gray-700"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
            className="bg-transparent border border-gray-500 rounded-md p-4 w-full text-white focus:outline-none focus:border-gray-700"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
            className="bg-transparent border border-gray-500 rounded-md p-4 w-full text-white focus:outline-none focus:border-gray-700"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
            className="bg-transparent border border-gray-500 rounded-md p-4 w-full text-white focus:outline-none focus:border-gray-700"
          />
          <button
            type="submit"
            className="bg-gray-700 text-white px-8 py-4 font-bold rounded-md uppercase hover:bg-gray-600 focus:outline-none"
          >
            Create User
          </button>
          <span className="text-white text-uppercase">
            Already have an account ?{" "}
            <Link to="/login" className="text-gray-400 font-bold">
              Login.
            </Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
  