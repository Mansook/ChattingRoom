import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Home.css'; // CSS 파일을 임포트합니다.
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../socket/socket";
import {
  receiveChat,
  selectChatList,
  selectError,
  selectInputWord,
  selectMember,
  selectSocketId,
  socketLogged,
  updateMember,
  selectOption,
  changeOption,
} from "../module/slice/chat";
const Home = () => {
  const [id, setId] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error,setError]=useState('');

  const handleChange = (event) => {
    setId(event.target.value);
  };
  useEffect(()=>{
    socket.on("my socket id", (data) => {
      console.log(data);
      dispatch(socketLogged({id: data.socketId }));
    });
  },[])
  const handleSubmit = (event) => {
    event.preventDefault();
    // 로그 추가
    if(id.length<1){
      setError("아이디가 너무 짧아요")
      return;
    }
    if(id.length>6){
      setError("아이디가 너무 길어요");
      return;
    }
    


    if (id) {
      console.log('Submitted ID:', id);
      navigate(`/chat?name=${id}`);
    } else {
      console.error('ID is null');
    }
  };

  return (
    <div className="home-container">
      <div className="home-title">Filchatter</div>
      <form className="home-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={id} 
          onChange={handleChange} 
          placeholder="이름" 
          className="home-input"
        />
       <div style={{
  marginBottom: "5px", // 속성명을 camelCase로 작성
  padding: "0",
  fontSize: "18px", // 속성명을 camelCase로 작성
  fontWeight: "bold", // 속성명을 camelCase로 작성
  color: "steelblue"
}}>
  {error}
</div>

        <button type="submit" className="home-button">입장</button>
      </form>
    </div>
  );
};

export default Home;
