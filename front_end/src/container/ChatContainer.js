import React, { useEffect, useState } from "react";
import Chat from "../component/Chat";
import { useSearchParams } from "react-router-dom";
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
  const [name, setName] = useState('');
  const [searchParams] = useSearchParams();
  const [idx, setIdx] = useState(-1);
  const [message, setMessage] = useState("");
  const [members, setMembers] = useState([]);
 
  const dispatch = useDispatch();
  const chatList = useSelector(selectChatList);
  const option = useSelector(selectOption);
  const error = useSelector(selectError);
  const member = useSelector(selectMember);
  const socketData = useSelector(selectSocketId);
  const returnData = useSelector(selectInputWord);

  useEffect(() => {
    setName(searchParams.get("name"));
  }, [searchParams]);

  useEffect(() => {
    if (name) {
      console.log("로그인:" + name );
      socket.emit("enter chatroom", name);
    }
  }, [name, dispatch]);

  useEffect(() => {
    if (member) {
      setMembers(member);
      if (socketData) {
        setIdx(member.findIndex((e) => e.id === socketData.id));
      }
    }
  }, [member, socketData]);

  const handleReceiveChat = (data) => {
    console.log(option);
    dispatch(receiveChat({ ...data, error: false, option: option }));
  };

  useEffect(() => {
    
    socket.on("member update", (data) => {
      dispatch(updateMember(data));
    });
    socket.on("receive chat", handleReceiveChat);
    return () => {
      socket.off("member update");
      socket.off("receive chat", handleReceiveChat);
    };
  }, [dispatch, handleReceiveChat]); 

  const onSend = (chat) => {
    socket.emit("send chat", {
      name: name,
      type: "message",
      socketId: socket.id,
      chat: chat,
      regData: Date.now(),
    });
  };

  const onChangeOption = (o) => {
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
        socketId={socket?.id} 
        chatList={chatList}
        onSend={onSend}
        onChangeOption={onChangeOption}
        member={members}
      />
    </div>
  );
};

export default ChatContainer;
