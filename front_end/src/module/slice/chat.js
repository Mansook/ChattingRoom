import { createSlice } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { filter_text } from "../../lib/api/filter";
import OpenAI from "openai";


const openai = new OpenAI({
  apiKey: "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", dangerouslyAllowBrowser: true
});
async function censor() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });
  const answer = completion.choices[0].message.content;
  //console.log(completion.choices[0]);
  return answer;
}

const findInDicSaga = function* (action) {
  if (action.payload.type === "message")
    try {
      const word = action.payload.chat;
      const chatgpt = yield call(filter_text, {"chat": word, "api_key": "4336a62ab2069cee31110575ac69c0dc", "option": 0});
      console.log(chatgpt); // censor 함수 실행을 기다림
      yield put(setInputWord({
        word: chatgpt.text,
        gpt: chatgpt.filtered
      }));
      yield put(setChatList());
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
    setChatList: (state, action) => {
      state.chatList[state.chatList.length-1].word=state.inputWord.word;
      state.chatList[state.chatList.length-1].gpt=state.inputWord.gpt;
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
  setChatList,
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
