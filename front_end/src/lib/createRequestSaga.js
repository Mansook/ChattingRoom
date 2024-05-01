/*
import { call, put } from "redux-saga/effects";
import { startLoading, finishLoading } from "../modules/slices/loading";

export const createRequestActionTypes = (type) => {
  const SUCCESS = `${type}success`;
  const FAILURE = `${type}failure`;
  return [type, SUCCESS, FAILURE];
};

export default function createRequestSaga(type, request) {
  const SUCCESS = `${type}success`;
  const FAILURE = `${type}failure`;

  return function* (action) {
    yield put(startLoading());
    const param = action.payload;
    console.log(param);
    try {
      const response = yield call(request, param);
      yield put({
        type: SUCCESS,
        payload: response.data,
        meta: response,
      });
    } catch (e) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(type));
  };
}
*/