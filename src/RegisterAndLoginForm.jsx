import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext.jsx";

export default function RegisterAndLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginOrRegister, setIsLoginOrRegister] = useState("login");
  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);
  async function handleSubmit(ev) {
    ev.preventDefault();
    const url = isLoginOrRegister === "register" ? "register" : "login";
    const { data } = await axios.post(url, { username, password });
    setLoggedInUsername(username);
    setId(data.id);
  }
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <div
        className={`min-h-screen signuppage md:flex-row-reverse justify-around flex  sm:flex-col-reverse sm:items-center`}
      >
        <div
          className={` flex flex-col items-center mx-10 sm:w-3/4 mt-2 md:w-1/3 my-4`}
        >
          <div className={`flex flex-col sm:w-screen md:w-full items-center`}>
            <h1 className="text-2xl font-semibold w-2/3 sm:mx-1 text-center my-2">
              Welcome To RapidTalk
            </h1>
            <h1 className={`text-2xl font-semibold w-2/3 sm:mx-1 text-center`}>
            {isLoginOrRegister === "register" ? "Register" : "Login"}
            </h1>
          </div>
          <div className={`sm:w-full md:w-3/4 mt-5`}>
            <form class=" w-full " onSubmit={handleSubmit}>
              <div class="mb-3 flex flex-col">
                <label for="name" class="flex font-medium text-gray-700">
                  UserName
                </label>
                <input
                  type="text"
                  class="form-input px-1 border border-gray-400 border-opacity-60 block w-full h-9 mt-3 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-500 focus:outline-none focus:border-blue-300 text-sm"
                  id="name"
                  name="name"
                  placeholder="Username"
                  value={username}
                  onChange={(ev) => setUsername(ev.target.value)}
                  minLength={3}
                  required
                />
              </div>
  
              <div class="mt-5 mb-3 flex flex-col">
                <label for="password" class="flex font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    class="form-input border border-gray-400 border-opacity-60 block w-full h-9  px-1 mt-3 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-500 focus:outline-none focus:border-blue-300 text-sm"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                    minLength={3}
                    required
                  />
                  <button
                    onClick={togglePasswordVisibility}
                    className="absolute mt-1 top-1/2 right-2 transform -translate-y-1/2 cursor-pointer opacity-40 hover:opacity-70"
                  >
                    <i class="fa-solid fa-eye"></i>
                  </button>
                </div>
              </div>
              <button
                type="submit"
                class={`btn block w-full mt-7 px-4 py-2 rounded-md bg-gradient-to-r from-blue-300 via-purple-500 to-blue-200 font-semibold hover:opacity-90 text-lg`}
              >
                {isLoginOrRegister === "register" ? "Register" : "Login"}
              </button>
            <div className="text-center mt-2">
              {isLoginOrRegister === "register" && (
                <div>
                  Already a member?
                  <button
                    className="ml-1"
                    onClick={() => setIsLoginOrRegister("login")}
                    >
                    Login here
                  </button>
                </div>
              )}
              {isLoginOrRegister === "login" && (
                <div>
                  Dont have an account?
                  <button
                    className="ml-1"
                    onClick={() => setIsLoginOrRegister("register")}
                    >
                    Register
                  </button>
                </div>
              )}
            </div>
              </form>{" "}
          </div>
        </div>
      </div>
    </>
  );
}

