import { createSlice } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { findWordInDic } from "../../api/dictionary/dic";

const findInDicSaga = function* (action) {
  if (action.payload.type === "message")
    try {
      const response = yield call(findWordInDic, { word: action.payload.chat });
      let parseXML = new DOMParser();
      let xmlDoc = parseXML.parseFromString(response.data, "text/xml");
      const word = xmlDoc.querySelector("item");
      if (word) {
        const sense = [];
        const means = word.getElementsByTagName("sense");
        Array.prototype.forEach.call(means, (element) => {
          sense.push(element.textContent);
        });
        yield put(
          setInputWord({
            word: word.getElementsByTagName("word")[0].textContent,
            sense: sense,
          })
        );
        yield put(setCurrentWord());
      } else {
        yield put(setError("그런단어 없슴둥ㅋ"));
      }
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
    updateTurn: (state, action) => ({
      ...state,
      turn: action.payload,
    }),
    setError: (state, action) => ({ ...state, error: action.payload }),
    setInputWord: (state, action) => {
      state.inputWord = action.payload;
    },
    setCurrentWord: (state, action) => {
      if (state.currentWord === "") {
        state.currentWord = state.inputWord;
        state.turn += 1;
      } else {
        let back = state.currentWord.word.slice(-1);
        let front = state.inputWord.word[0];

        if (back === front) {
          state.currentWord = state.inputWord;
          state.error = "";
          state.turn += 1;
        } else {
          state.error = "틀린 단어임둥ㅋ";
        }
      }
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
  updateTurn,
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
export const selectTurn = (state) => state.chat.turn;
export const selectMember = (state) => state.chat.member;
export const selectSocketId = (state) => state.chat.socketId;
export default chatSlice.reducer;
