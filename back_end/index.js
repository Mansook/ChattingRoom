const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

io.on("connection", (socket) => {
  console.log("연결된 socketID : ", socket.id);
  io.to(socket.id).emit("my socket id", { socketId: socket.id });

  socket.on("enter chatroom", () => {
    console.log("누군가가 입장함");
    socket.broadcast.emit("receive chat", {
      type: "alert",
      chat: "누군가가 입장하였습니다.",
      regDate: Date.now(),
    });
  });

  socket.on("send chat", (data) => {
    console.log(`${socket.id} : ${data.chat}`);
    io.emit("receive chat", data);
  });

  socket.on("leave chatroom", (data) => {
    console.log("leave chatroom ", data);
    socket.broadcast.emit("receive chat", {
      type: "alert",
      chat: "누군가가 퇴장하였습니다.",
      regDate: Date.now(),
    });
  });
});
