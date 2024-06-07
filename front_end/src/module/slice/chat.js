import { createSlice } from "@reduxjs/toolkit";
import { call, put, select, takeEvery, takeLatest } from "redux-saga/effects";
import { filter_text } from "../../lib/api/filter";
import OpenAI from "openai";


const findInDicSaga = function* (action) {
  const socketId=yield select(selectSocketId)
  console.log(socketId);
  if (action.payload.type === "message")
    try {
      console.time("api");
      const payload=action.payload
      const word = action.payload.chat;
      if(socketId.id == action.payload.socketId){
        yield put(setInputWord({
          gpt: action.payload.chat,
          ...payload
        }));
      }
      else{
        const chatgpt = yield call(filter_text, {"chat": word, "api_key": "4336a62ab2069cee31110575ac69c0dc", "option": action.payload.option});
        const reg=action.payload;
        yield put(setInputWord({
          gpt: chatgpt.result,
          ...payload
        }));
      }
      console.timeEnd("api");
    } catch (e) {
      console.log(e);
      yield put(setInputWord({
        ...action.payload
      }));
    }
};

export function* findWordSaga() {
  yield takeEvery(receiveChat, findInDicSaga);
}
const chatSlice = createSlice({
  name: "chat",
  initialState: {
    member: [],
    chatList: [],
    socketId: null,
    error: "",
    option: 0,  
  },
  reducers: {
    updateMember: (state, action) => ({
      ...state,
      member: action.payload,
    }),
    
    setError: (state, action) => ({ ...state, error: action.payload }),
    setInputWord: (state, action) => ({
      //console.log(action.payload);
      ...state,
      chatList: [...state.chatList, action.payload],
    }),
    setChatList: (state, action) => {
      /*const index = state.chatList.findIndex(item => item.regData === action.payload);
      console.log(index);
      state.chatList[index].gpt=state.inputWord.gpt;
      state.inputWord = "";*/
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
    }),
    clearChat: (state, action) => ({
      ...state,
      chatList: [],
    }),
    changeOption:(state,action)=>({
      ...state,
      option: action.payload
    }),
  },
});

export const {
  updateMember,
  setInputWord,
  setChatList,
  socketLogged,
  sendChat,
  receiveChat,
  clearChat,
  setError,
  changeOption,
} = chatSlice.actions;
export const selectChatList = (state) => state.chat.chatList;
export const selectCurrentWord = (state) => state.chat.currentWord;
export const selectError = (state) => state.chat.error;
export const selectMember = (state) => state.chat.member;
export const selectSocketId = (state) => state.chat.socketId;
export const selectInputWord=(state)=>state.chat.inputWord;
export const selectOption=(state)=>state.chat.option;
export default chatSlice.reducer;