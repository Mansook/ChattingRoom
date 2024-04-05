import React, { useState } from "react";
import "../chat.css";

const Chat = ({ name, error, socketId, chatList, onSend }) => {
  const [write, setWrite] = useState("");

  const onChange = (e) => {
    setWrite(e.target.value);
  };
  return (
    <div>
      <div>
        <ul>
          {chatList.map((c) => (
            <li>
             {(c.type == "alert")?
              c.chat:c.name+"  "+c.chat}
            </li>
          ))}
        </ul>
      </div>   
      <div>
        <input onChange={onChange} value={write} placeholder="입력" />
        <button
          onClick={() => {
            onSend(write);
            setWrite("");
          }}
        >
          제출
        </button>
      </div>
    </div>
  );
};

export default Chat;
