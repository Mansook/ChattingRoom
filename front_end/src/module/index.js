import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import { findWordSaga } from "./slice/chat";
const rootReducer = combineReducers({});

export function* rootSaga() {
  yield all([findWordSaga()]);
}
export default rootReducer;
