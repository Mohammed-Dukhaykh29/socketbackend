const mongoose = require("mongoose")
const Schema = mongoose.Schema

const messagesSchema = new Schema({
  desc: String,
  userReceive: {
    type: mongoose.Types.ObjectId,
    ref : "user"
  },
})

const messages = mongoose.model("message", messagesSchema)
module.exports = messages
