import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "../module/slice/chat";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});
