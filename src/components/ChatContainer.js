import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";

export default function ChatContainer({ currentChat, socket,isContactSelected }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    const response = await axios.post(recieveMessageRoute, {
      from: data._id,
      to: currentChat._id,
    });
    setMessages(response.data);
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={`${isContactSelected ? ' w-full ': ' w-0 '} lg:w-5/6 bg-gray-700 overflow-hidden relative`}>
      <div className="flex justify-between items-center p-2">
        <div className="flex items-center gap-4">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
              className="h-12"
            />
          </div>
          <div className="username">
            <h3 className="text-white">{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="flex flex-col p-2 gap-2 overflow-auto scrollbar-thin scrollbar-thumb-white scrollbar-track-transparent h-4/5">
        {messages.map((message) => (
          <div ref={scrollRef} key={uuidv4()}>
            <div
              className={`flex ${
                message.fromSelf ? "justify-end sended" : "justify-start recieved"
              }`}
            >
              <div className="content max-w-60 md:max-w-96 max-w max-w- overflow-wrap break-words p-4 text-lg rounded-md" style={{ color: '#d1d1d1', backgroundColor: message.fromSelf ? 'black' : 'rgb(42, 108, 122)' }}>
                <p>{message.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 w-full">
      <ChatInput handleSendMsg={handleSendMsg} />
      </div>
    </div>
  );
            }