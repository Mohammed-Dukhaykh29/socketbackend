const express = require("express")
const { getMsg, addMsg, deleteMessages, getMsgByUserId } = require("../controllers/messagesControllers")
const messagesRouters = express.Router()

messagesRouters.get("/", getMsg)

messagesRouters.get("/:id", getMsgByUserId)

messagesRouters.post("/", addMsg)

messagesRouters.delete("/", deleteMessages)

module.exports = messagesRouters
