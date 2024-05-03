import React, { useState } from "react";
import "../chat.css";

const Chat = ({ name, error, socketId, chatList, onSend ,member}) => {
  const [write, setWrite] = useState("");
 
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
      <div>
        참여자
        <ul>
          {member.map((c)=>(
            <li className="box">
              {c.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Chat;
