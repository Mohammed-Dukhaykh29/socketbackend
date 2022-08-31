const server = require("socket.io")
const io = server()

var Socket = {
  emit: function (event, data) {
    console.log(event, data)
    io.sockets.emit(event, data)
  },
}

io.on("connection", function (socket) {
  console.log("A user connected")
  // io.on("send-message", data => {
  //   console.log("send Message Success")
  // })
})

module.exports = { io, Socket }
