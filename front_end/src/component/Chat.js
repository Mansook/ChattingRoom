import React, { useEffect, useRef, useState } from "react";
import "../chat.css";

const Chat = ({ name, error, socketId, chatList, onSend ,member,onChangeOption}) => {
  const [write, setWrite] = useState("");
  const [opt,setOpt]=useState(1);
  const [choice,setchoice]=useState(["필터링 없음","욕설을 아예 보지않습니다","욕설을 ***으로 전환합니다","욕설을 순화시킵니다"])
  useEffect(() => {
    messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [chatList]);
  const messageEndRef = useRef(null); 
  const [showModal, setShowModal] = useState(false);
 
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleOptionClick = (option) => {
    setOpt(option);
    onChangeOption(option);
    closeModal();
  };

  const onChange = (e) => {
    setWrite(e.target.value);
  };
  const submit=()=>{
    if(write.length>0){
    onSend(write);
    setWrite("");
    }
  }
  const activeEnter = (e) => {
    if(e.key === "Enter" && write.length>0) {
      submit();
    }
  }
  return (
     <div class="container">
    <div class="chat-box">
      <ul>
        {chatList.map((c) => (
  <li className={`message ${c.type === "alert" ? "alert" : ""} ${name === c.name ? "my" : ""}`}>
    {c.type==="alert" ? c.chat :
      (c.gpt === undefined ? `${c.name} : ${c.chat}` :
      (c.gpt === "0" ? `${c.name} : ${c.chat}` : `${c.name} : ${c.gpt}`))}

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
    <div class="option">
    <button onClick={openModal}>필터링 설정 열기</button><h3><div>현재 옵션 {opt}</div></h3>
    </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>설정<div>  현재 옵션 :  {opt}</div></h2>
            <ul>
              {[1, 2, 3, 4].map((option) => (
                <li key={option} onClick={() => handleOptionClick(option)}>
                  {option} : {choice[option-1]}
                </li>
              ))}
            </ul>
            <button onClick={closeModal}>닫기</button>
          </div>
        </div>
      )}
    <div class="bb">참가자 {member.length}명 </div>
    
  </div>
  );
};

export default Chat;
