import { createSlice } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";

const findInDicSaga = function* (action) {
  if (action.payload.type === "message")
    try {
      const word = action.payload.chat;
      yield put(setInputWord({word:word}));
    } catch (e) {
      console.log(e);
    }
};
export function* findWordSaga() {
  yield takeLatest(receiveChat, findInDicSaga);
}
const chatSlice = createSlice({
  name: "chat",
  initialState: {
    member: [],
    chatList: [],
    socketId: null,
    turn: -1,
    currentWord: "",
    inputWord: "",
    success: null,
    error: "",
  },
  reducers: {
    updateMember: (state, action) => ({
      ...state,
      member: action.payload,
    }),
    
    setError: (state, action) => ({ ...state, error: action.payload }),
    setInputWord: (state, action) => {
      state.inputWord = action.payload;
    },
    setCurrentWord: (state, action) => {
      if (state.currentWord === "") {
        state.currentWord = state.inputWord;
      }
      state.currentWord = state.inputWord;
      state.error = "";
      state.inputWord = "";
    },
    socketLogged: (state, action) => ({
      ...state,
      socketId: action.payload,
    }),
    sendChat: (state, action) => ({
      ...state,
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

export const {
  updateMember,
  setInputWord,
  setCurrentWord,
  socketLogged,
  sendChat,
  receiveChat,
  clearChat,
  setError,
} = chatSlice.actions;
export const selectChatList = (state) => state.chat.chatList;
export const selectCurrentWord = (state) => state.chat.currentWord;
export const selectError = (state) => state.chat.error;
export const selectMember = (state) => state.chat.member;
export const selectSocketId = (state) => state.chat.socketId;
export default chatSlice.reducer;
