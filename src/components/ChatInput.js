import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import Picker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <div className="grid items-center w-full md:px-1 mt-6">
      
      <form
        className="flex items-center w-full border bg-white bg-opacity-20 p-2 "
        onSubmit={(event) => sendChat(event)}
      >
        <input
          type="text"
          placeholder="Type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
          className="w-11/12 h-10 bg-transparent text-white focus:outline-none relative text-lg"
        />
        <div className="flex items-center text-white gap-4 fixed right-16 lg:right-20  bottom-2">
        <div className="flex flex-col-reverse items-end">
          <BsEmojiSmileFill
            onClick={handleEmojiPickerhideShow}
            className="text-yellow-300 cursor-pointer text-2xl my-3"
          />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
        <button
          type="submit"
          className="ml-12 rounded-full flex items-center justify-center"
        >
          <IoMdSend className="text-white text-3xl" />
        </button>
      </form>
    </div>
  );
}
