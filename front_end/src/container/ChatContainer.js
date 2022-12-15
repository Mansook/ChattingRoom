import React, { useEffect } from "react";
import Chat from "../component/Chat";
import { useLocation, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../socket/socket";
import {
  receiveChat,
  selectChatList,
  selectError,
  selectTurn,
  sendChat,
  socketLogged,
} from "../module/slice/chat";
import { findWordInDic } from "../api/dictionary/dic";

const ChatContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name");
  const dispatch = useDispatch();
  const chatList = useSelector(selectChatList);
  const error = useSelector(selectError);
  const turn = useSelector(selectTurn);

  useEffect(() => {
    socket.emit("enter chatroom", name);
    socket.on("my socket id", (data) => {
      console.log("socket Id: " + data.socketId);
      dispatch(socketLogged(data.socketId));
    });
  }, []);

  useEffect(() => {
    socket.on("receive chat", (data) => {
      dispatch(receiveChat(data));
    });
  }, [dispatch]);

  useEffect(() => {
    console.log(chatList);
  }, [chatList]);
  const onSend = (chat) => {
    socket.emit("send chat", {
      type: "message",
      socketId: socket.id,
      chat: chat,
      regData: Date.now(),
    });
  };
  return (
    <Chat
      error={error}
      socketId={socket.id}
      chatList={chatList}
      onSend={onSend}
    />
  );
};

export default ChatContainer;
