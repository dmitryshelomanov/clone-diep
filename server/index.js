const server = require("http").createServer();
const io = require("socket.io")(server);
const playerData = require("./player/generetePl");

let players = {};
let id = 0;

io.on("connection", function (socket) {

  socket.ids = id++;

  playerData.ready(io, socket, players);
  playerData.move(io, socket, players);
  playerData.fire(io, socket);

  socket.on("disconnect", function () {
    playerData.disconnect(io, socket, players);
  });

});

server.listen(3000, "192.168.150.64");