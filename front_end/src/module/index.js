import { combineReducers } from "redux";
import { findWordSaga } from "./slice/chat";

export function* rootSaga() {
  yield findWordSaga();
}