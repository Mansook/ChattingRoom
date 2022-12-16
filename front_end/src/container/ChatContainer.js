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
  selectTurn,
  sendChat,
  socketLogged,
  updateMember,
  updateTurn,
} from "../module/slice/chat";
const ChatContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [idx, setIdx] = useState(-1);
  const [message, setMessage] = useState("");
  const name = searchParams.get("name");
  const dispatch = useDispatch();
  const chatList = useSelector(selectChatList);
  const error = useSelector(selectError);
  const turn = useSelector(selectTurn);
  const member = useSelector(selectMember);
  const socketData = useSelector(selectSocketId);

  useEffect(() => {
    socket.emit("enter chatroom", name);
    socket.on("my socket id", (data) => {
      dispatch(socketLogged({ name: name, id: data.socketId }));
    });
  }, []);

  useEffect(() => {
    setIdx(member.findIndex((e) => e.id === socketData.id));
  }, [member]);

  useEffect(() => {
    console.log(idx);
  }, [idx]);
  useEffect(() => {
    socket.on("member update", (data) => {
      dispatch(updateMember(data));
    });
    socket.on("receive chat", (data) => {
      dispatch(receiveChat(data));
      console.log(data);

      if (data.turn === 0) {
        dispatch(updateTurn(data.turn));
      }
    });
  }, [dispatch]);

  useEffect(() => {
    console.log(member);
  }, [member]);

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
      turn={turn % member}
      error={error}
      message={message}
      socketId={socket.id}
      chatList={chatList}
      onSend={onSend}
    />
  );
};

export default ChatContainer;
