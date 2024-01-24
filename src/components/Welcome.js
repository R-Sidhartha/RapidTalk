import React, { useState, useEffect } from "react";
import Robot from "../assets/robot.gif";
export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(async () => {
    setUserName(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).username
    );
  }, []);
  return (
    <div className={`flex w-0 lg:w-5/6 justify-center items-center flex-col text-white overflow-hidden`}>
      <img src={Robot} alt="" className="h-80" />
      <h1 className="mt-4 text-3xl">
        Welcome, <span className="text-gray-400">{userName}!</span>
      </h1>
      <h3 className="mt-2 text-lg">Please select a chat to start messaging.</h3>
    </div>
  );
}
