const mongoose = require("mongoose")
const Schema = mongoose.Schema

const messagesSchema = new Schema({
  title: String,
  description: String,
  messageTime: {
    type: Date,
    default: Date.now,
  },
})

const messages = mongoose.model("message", messagesSchema)
module.exports = messages
