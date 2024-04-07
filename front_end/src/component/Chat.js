import React, { useState } from "react";
import "../chat.css";

const Chat = ({ name, error, socketId, chatList, onSend }) => {
  const [write, setWrite] = useState("");
  console.log(chatList);
  const onChange = (e) => {
    setWrite(e.target.value);
  };
  return (
    <div>
      <div>
        <ul>
          {chatList.map((c) => (
            <li className="box">
             {(c.type == "alert")?
              c.chat:c.name+" : "+c.chat+"gpt : "+c.gpt}
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
