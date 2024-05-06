import React, { useEffect, useState } from "react";
import Chat from "../component/Chat";
import { useLocation, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../socket/socket";

import {
  receiveChat,
  selectChatList,
  selectError,
  selectMember,
  selectSocketId,
  socketLogged,
  updateMember
} from "../module/slice/chat";
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

  useEffect(() => {
    console.log(socket);
    socket.on("my socket id", (data) => {
      dispatch(socketLogged({ name: name, id: data.socketId }));
    });
    socket.emit("enter chatroom", name);
  }, []);

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
  }, [dispatch]);

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
    <Chat
      name={name}
      error={error}
      message={message}
      socketId={socket.id}
      chatList={chatList}
      onSend={onSend}
      member={members}
    />
  );
};

export default ChatContainer;
