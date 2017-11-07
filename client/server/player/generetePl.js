const maps = require("../maps");

module.exports = {
  data(ids) {
    return {
      ids: ids,
      x: Math.floor(Math.random() * 500),
      y: Math.floor(Math.random() * 500),
      r: 0
    }
  },
  ready(io, socket, players) {
    socket.on("player:ready", (cb) => {
      cb();
      socket.broadcast.emit("player:newPlayer", this.data(socket.ids));
      socket.emit("player:join", this.data(socket.ids));
      socket.emit("player:get", players);

      if (maps.data.length === 0) 
        socket.emit("maps:get", maps.generate(200));
      socket.emit("maps:get", maps.data);

      maps.onMove(io, socket);

      players[socket.ids] = this.data(socket.ids);
    });
  },
  move(io, socket) {
    socket.on("player:move", function (pl) {
      socket.broadcast.emit("player:move-client", pl);
    });
  },
  fire(io, socket) { 
    socket.on("player:fire", function (ids) {
      socket.broadcast.emit("player:fire-client", ids);
    });
  },
  disconnect(io, socket, players) {
    io.emit("player:disconnect", socket.ids);
    delete players[socket.ids];
  }
};