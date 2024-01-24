import React, { useState, useEffect } from "react";
import Logo from "../assets/chat-icon.png";

export default function Contacts({ contacts, changeChat, isContactSelected,setisContactSelected}) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
    setisContactSelected(true)

  };
  return (
    <>
      {currentUserImage && currentUserImage && (
        <div className={`flex flex-col ${isContactSelected ? ' w-0 ' : ' w-full '} lg:w-1/3  items-center overflow-hidden bg-gray-600 relative z-50`}>
          <div className="flex items-center justify-center gap-1 p-4 mb-10">
            <img src={Logo} alt="logo" className="w-10" />
            <h3 className="text-white text-3xl">RapidTalk</h3>
          </div>
          <h2 className="text-xl mb-3 lg:hidden">Select One Contact to Chat</h2>
          <div className="flex flex-col items-center overflow-auto gap-2 scrollbar-thin scrollbar-thumb-white scrollbar-track-transparent w-11/12 h-3/4 lg:h-3/4">
            {contacts.map((contact, index) => (
              <div
                key={contact._id}
                className={`w-3/4 bg-white bg-opacity-20 rounded-md p-2 cursor-pointer transition duration-500 ease-in-out ${
                  index === currentSelected ? "bg-purple-600" : ""
                }`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="flex gap-2 items-center">
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                      className="h-9"
                    />
                  </div>
                  <div className="username">
                    <h3 className="text-white text-xl">{contact.username}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center gap-2 p-4 ">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
                className="h-10 max-w-full"
              />
            </div>
            <div className="username">
              <h2 className="text-white text-2xl">{currentUserName}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
