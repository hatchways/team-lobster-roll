function socketConnect(server) {
  const io = require("socket.io")(server);

  io.on("connection", (socket) => {
    console.log("A user has connected");

    socket.on("joinRoom", (boardId, userId) => {
      socket.join(boardId);
      console.log(`a user ${userId} has joined: `, boardId);
      io.in(boardId).emit("roomResponse", {
        msg: `you have joined: ${boardId}`,
      });
    });

    socket.on("editBoard", (boardId, userId, msg) => {
      console.log(`a user ${userId} did to ${boardId}: ${msg}`);
      io.in(boardId).emit("roomResponse", {
        boardId: boardId,
        msg: `User ${userId} has made a change to board ${boardId}`,
        data: msg,
      });
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
