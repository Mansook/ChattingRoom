import React, { useState } from "react";
import "../chat.css";

const Chat = ({ turn, error, socketId, chatList, onSend }) => {
  const [write, setWrite] = useState("");

  const onChange = (e) => {
    setWrite(e.target.value);
  };
  return (
    <div>
      <div>
        <ul className={error ? "error" : "correct"}>
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
      <div style={{ color: "red" }}>{error}</div>
      <div>{turn ? <div>내차례!</div> : <div />}</div>
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
