function socketConnect(server) {
  const io = require("socket.io")(server);

  io.on("connection", (socket) => {
    console.log("A user has connected");

    socket.on("joinRoom", (boardId) => {
      socket.join(boardId);
      console.log("a user has joined: ", boardId);
      io.in(boardId).emit("roomResponse", `you have joined: ${boardId}`);
    });

    socket.on("leaveRoom", (boardId) => {
      socket.leave(boardId);
      console.log("a user has left: ", boardId);
      socket.emit("roomResponse", `you have left: ${boardId}`);
    });

    socket.on("disconnect", () => {
      console.log("A user has disconnected");
    });
  });

  return io;
}

module.exports = socketConnect;
