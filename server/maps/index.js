module.exports = {
  data: [],
  generate(limit) { 
    for (let i = 0; i < limit; i++) { 
      this.data.push({
        ids: i,
        x: Math.floor(Math.random() * 10000),
        y: Math.floor(Math.random() * 10000),
        r: 0,
        h: 200
      });
    };
    return this.data;
  },
  onMove(io, socket) { 
    socket.on("map:move", ({ ids, x, y }) => {
      this.data[ids].x = x;
      this.data[ids].y = y;
      socket.broadcast.emit("map:move-client", { ids, x, y });
    });
  }
};