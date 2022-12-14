import React, { useState } from "react";
import "../chat.css";

const Chat = ({ socketId, chatList, onSend }) => {
  const [write, setWrite] = useState("");
  const onChange = (e) => {
    setWrite(e.target.value);
  };
  return (
    <div>
      <div>
        <ul>
          {chatList.map((c) => (
            <li
              className={
                c.type === "message"
                  ? socketId === c.socketId
                    ? "box message me"
                    : "box message you"
                  : "box alert"
              }
            >
              {c.chat}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <input onChange={onChange} value={write} placeholder="γγ" />
        <button
          onClick={() => {
            onSend(write);
            setWrite("");
          }}
        >
          μ μΆ
        </button>
      </div>
    </div>
  );
};

export default Chat;
