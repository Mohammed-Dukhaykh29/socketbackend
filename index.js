const express = require("express")
const cors = require("cors")
const db = require("./db.connection")
const app = express()
app.use(express.json())
app.use(cors())

require("dotenv").config()

// app.use(express.static("public"))
const messagesRouters = require("./Routers/messageRouters")
const userRouters = require("./Routers/userRouters")
const loginRouters = require("./Routers/loginRouters")

app.use("/api/messages", messagesRouters)
app.use("/api/users", userRouters)
app.use("/api/login", loginRouters)

const server = app.listen(3000, () => {
  console.log(`Server Started at ${3000}`)
})

const socket = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
})

// On every Client Connection
socket.on("connection", socket => {
  console.log("Socket: client connected", socket.id)
  // console.log(socket.id)
  socket.on("send-message", data => {
    socket.emit("recieve-data", data)
    socket.broadcast.emit("recieve-data", data)
  })
})
