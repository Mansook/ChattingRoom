import React, { useEffect, useRef, useState } from "react";
import "../chat.css";

const Chat = ({ name, error, socketId, chatList, onSend ,member}) => {
  const [write, setWrite] = useState("");
  useEffect(() => {
    messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [chatList]);
  const messageEndRef = useRef(null);
  const onChange = (e) => {
    setWrite(e.target.value);
  };
  const submit=()=>{
    onSend(write); setWrite("");
  }
  const activeEnter = (e) => {
    if(e.key === "Enter") {
      submit();
    }
  }
  return (
     <div class="container">
    <div class="chat-box">
      <ul>
        {chatList.map((c) => (
  <li className={`message ${c.type === "alert" ? "alert" : ""} ${name === c.name ? "my" : ""}`}>
    {(c.type === "alert") ? c.chat : `${c.name}  :  ${c.chat} (GPT: ${c.gpt})`}
  </li>
))}
        <li ref={messageEndRef}></li>
      </ul>
    </div>
    <div class="input-box">
      <input
            onChange={onChange}
            value={write}
            placeholder="메시지 입력"
            onKeyDown={(e) => activeEnter(e)}
      />
      <button onClick={() => { submit(); } }>전송</button>
    </div>
    <h2>참가자</h2>
    <div class="participants">
      <ul>
        {member.map((c) => (
          <li className="participant">{c.name}</li>
        ))}
      </ul>
    </div>
  </div>
  );
};

export default Chat;
