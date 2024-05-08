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
  updateMember
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
  const error = useSelector(selectError);
  const member = useSelector(selectMember);
  const socketData = useSelector(selectSocketId);
  const returnData=useSelector(selectInputWord);

  useEffect(() => {
    console.log(socket);
    socket.on("my socket id", (data) => {
      dispatch(socketLogged({ name: name, id: data.socketId }));
    });
    socket.emit("enter chatroom", name);
  }, []);

  useEffect(()=>{
    //console.log(returnData);
  },[chatList]);

  useEffect(() => {
    setMembers(member);
    setIdx(member.findIndex((e) => e.id === socketData.id));
  }, [member]);

  useEffect(() => {
    socket.on("member update", (data) => {
      dispatch(updateMember(data));
    });
    socket.on("receive chat", (data) => {
      dispatch(receiveChat({ ...data, error: false }));
      //console.log(data);
    });
  }, [dispatch,message]);

  const onSend = (chat) => {
    socket.emit("send chat", {
      name: name,
      type: "message",
      socketId: socket.id,
      chat: chat,
      regData: Date.now(),
    });
  };

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
        member={members}
      />
    </div>
  );
};

export default ChatContainer;
