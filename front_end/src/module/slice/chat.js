import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatList: [],
    socketId: null,
  },
  reducers: {
    socketLogged: (state, action) => ({
      ...state,
      socketId: action.payload,
    }),
    sendChat: (state, action) => ({
      ...state,
      socketId: action.payload.socektId,
    }),
    receiveChat: (state, action) => ({
      ...state,
      chatList: [...state.chatList, action.payload],
    }),
    clearChat: (state, action) => ({
      ...state,
      chatList: [],
    }),
  },
});

export const { socketLogged, sendChat, receiveChat, clearChat } =
  chatSlice.actions;
export const selectChatList = (state) => state.chat.chatList;
export default chatSlice.reducer;
