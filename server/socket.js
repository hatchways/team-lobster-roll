function socketConnect(server) {
  const io = require("socket.io")(server);

  io.on("connection", (socket) => {
    console.log("A user has connected");

    socket.on("testEmit", (message) => {
      console.log("A user is " + message);
      socket.emit("confirmEmit", "Successful emit!");
    });

    socket.on("disconnect", () => {
      console.log("A user has disconnected");
    });
  });
}

module.exports = socketConnect;
