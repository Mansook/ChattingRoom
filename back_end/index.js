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

let member = [];

io.on("connection", (socket) => {
  io.to(socket.id).emit("my socket id", { socketId: socket.id });

  socket.on("enter chatroom", (name) => {
    member.push({ id: socket.id, name: name });
    io.emit("member update", member);
    socket.broadcast.emit("receive chat", {
      name: name,
      id: socket.id,
      type: "alert",
      chat: name + "님이 입장하였습니다.",
      regDate: Date.now(),
    });

    if (member.length >= 2) {
      io.emit("receive chat", {
        type: "alert",
        chat: "끝말잇기 시작",
        regDate: Date.now(),
        turn: 0,
      });
    } else {
      io.emit("receive chat", {
        type: "alert",
        chat: "다른 사람을 기다리는중..",
        regDate: Date.now(),
      });
    }
  });

  socket.on("send chat", (data) => {
    console.log(`${socket.id} : ${data.chat}`);
    io.emit("receive chat", data);
  });

  socket.on("disconnect", () => {
    member.map((c) =>
      c.id === socket.id
        ? io.emit("receive chat", {
            type: "alert",
            chat: c.name + "님이 나갔습니다",
          })
        : {}
    );
    member = member.filter((c) => c.id != socket.id);
    io.emit("member update", member);
    if (member.length == 1) {
      io.emit("receive chat", {
        type: "alert",
        chat: "다른 사람을 기다리는중..",
        regDate: Date.now(),
      });
    }
  });
});
