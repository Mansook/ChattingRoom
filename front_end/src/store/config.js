import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "../module/slice/chat";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "../module";

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(rootSaga);
