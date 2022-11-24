import React from "react";
import io from "socket.io-client";

export const socket = io("localhost:8000", {
  cors: { origin: "*" },
});
export const SocketContext = React.createContext();
