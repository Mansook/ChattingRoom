const express = require("express");
const cors=require("cors");
const app = express();


app.use((req, res, next) => {
  const corsWhitelist = [
      "https://web-chattingroom-1272llx2n6xjr.sel5.cloudtype.app","http://localhost:3000"
  ];
  if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  }
  next();
});
const server = require("http").Server(app);
const io = require("socket.io")(server,{
  cors:{
    origin : ["https://web-chattingroom-1272llx2n6xjr.sel5.cloudtype.app","http://localhost:3000"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

//console.log(io);
/*
const server = require("http").Server(app);
const io = require("socket.io")(server,{
  cors:{
    origin : "http://localhost:3000",

    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});
*/
const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("https://48c1-112-150-250-55.ngrok-free.app/?name=이름 으로 접속해주세요");
});

let member = [];

io.on("connection", (socket) => {
  console.log(socket.id);
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

    if (member.length == 1) {
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
