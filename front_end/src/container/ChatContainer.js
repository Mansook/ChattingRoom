import React, { useEffect, useState } from "react";
import Chat from "../component/Chat";
import { useLocation, useSearchParams } from "react-router-dom";
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
import { Helmet } from "react-helmet-async";
const ChatContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [idx, setIdx] = useState(-1);
  const [message, setMessage] = useState("");
  const [members,setMembers]=useState([]);
  const name = searchParams.get("name");
  const dispatch = useDispatch();
  const chatList = useSelector(selectChatList);
  const option=useSelector(selectOption);
  const error = useSelector(selectError);
  const member = useSelector(selectMember);
  const socketData = useSelector(selectSocketId);
  const returnData=useSelector(selectInputWord);

  useEffect(() => {
    socket.on("my socket id", (data) => {
      dispatch(socketLogged({ name: name, id: data.socketId }));
    });
    socket.emit("enter chatroom", name);
  }, []);

  useEffect(() => {
    setMembers(member);
    setIdx(member.findIndex((e) => e.id === socketData.id));
  }, [member]);
  // handleReceiveChat 함수 정의
  const handleReceiveChat = (data) => {
    console.log(option);
    dispatch(receiveChat({ ...data, error: false, option: option }));
  };

  useEffect(() => {
    // "member update" 이벤트 리스너 등록
    socket.on("member update", (data) => {
      dispatch(updateMember(data));
    });
    // "receive chat" 이벤트 리스너 등록
    socket.on("receive chat", handleReceiveChat);
  
    // clean-up 함수를 반환하여 컴포넌트가 언마운트되거나 재렌더링될 때 이전 리스너를 제거
    return () => {
      socket.off("member update");
      socket.off("receive chat", handleReceiveChat);
    };
  }, [handleReceiveChat]); // handleReceiveChat 함수가 변경될 때마다 useEffect가 재실행되도록 함
  

  const onSend = (chat) => {
    socket.emit("send chat", {
      name: name,
      type: "message",
      socketId: socket.id,
      chat: chat,
      regData: Date.now(),
    });
  };
  const onChangeOption=(o)=>{
    dispatch(changeOption(o));
  }
  return (
    <div>
    <Helmet>
    <meta 
  http-equiv="Content-Security-Policy"
  content="upgrade-insecure-requests"
/>
    </Helmet>
      <Chat
        name={name}
        error={error}
        message={message}
        socketId={socket.id}
        chatList={chatList}
        onSend={onSend}
        onChangeOption={onChangeOption}
        member={members}
      />
    </div>
  );
};

export default ChatContainer;
