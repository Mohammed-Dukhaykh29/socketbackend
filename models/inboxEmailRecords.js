const mongoose = require("mongoose")
const Schema = mongoose.Schema

const inboxEmailRecordsSchema = new Schema({
  messageId: {
    type: mongoose.Types.ObjectId,
    ref: "message",
  },
  from: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  to: [
    {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  ],
  isArchives: {
    type: Boolean,
    default: false,
  },
  isMessageReply: {
    type: Boolean,
    default: false,
  },
  messageReplyId: {
    type: mongoose.Types.ObjectId,
    ref: "inboxEmailRecord",
  },
  messagesReply: [
    {
      type: mongoose.Types.ObjectId,
      ref: "inboxEmailRecord",
    },
  ],
  usersReadMessage: [
    {
      userRecieve: {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
      isRaed: {
        type: Boolean,
        default: false,
      },
    },
  ],
})

const inboxEmailRecords = mongoose.model("inboxEmailRecord", inboxEmailRecordsSchema)
module.exports = inboxEmailRecords
