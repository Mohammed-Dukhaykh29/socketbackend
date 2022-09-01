const messages = require("../models/messagesEmail")

const { Socket } = require("../middleware/socket.service")
const inboxEmailRecords = require("../models/inboxEmailRecords")

const getMsg = async (req, res) => {
  try {
    const msg = await inboxEmailRecords
      .find()
      .populate("messageId")
      .populate("from")
      .populate("to")
      .populate("messageReplyId")
      .populate("messagesReply")
      .populate("usersReadMessage.userRecieve")
    Socket.emit("send-message", msg)
    res.json(msg)
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message)
  }
}

const getMsgByUserId = async (req, res) => {
  try {
    const { userRecive } = req.body
    const msg = await inboxEmailRecords.findOne({ _id: req.params.id })

    // const UpdateMessage = await inboxEmailRecords.findByIdAndUpdate(
    //   {
    //     _id: req.params.id,
    //     "usersReadMessage.userRecieve": userRecive,
    //   },
    //   {
    //     $set: {
    //       "usersReadMessage.$.userRecieve": {
    //         isRaed: true,
    //       },
    //     },
    //   },
    //   { multi: true }
    // )
    const UpdateMessage = await inboxEmailRecords.findOne({ _id: req.params.id })
    let msgFind = UpdateMessage.usersReadMessage?.map(id => id)
    msgFind.forEach(data , index => {
      if (data.userRecieve == userRecive ) {
        data.isRaed = true
      }
    })
    // msgFind.isRaed = true
    // await inboxEmailRecords.findByIdAndUpdate({ _id: req.params.id } , findOne)
    console.log(msgFind)
    res.json(UpdateMessage)
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message)
  }
}

const addMsg = async (req, res) => {
  try {
    const { title, description, from, to, isMessageReply, isArchives, messageReplyId, usersReadMessage } = req.body
    const newMessage = new messages({
      title,
      description,
    })
    await newMessage.save()
    const messageRecord = new inboxEmailRecords({
      messageId: newMessage._id,
      from,
      to,
      isMessageReply,
      isArchives,
      messageReplyId,
      usersReadMessage: { userRecieve: to, isRaed: false },
    })
    await messageRecord.save()
    const allMessages = await inboxEmailRecords
      .find()
      .populate("messageId")
      .populate("from")
      .populate("to")
      .populate("messageReplyId")
      .populate("messagesReply")
      .populate("usersReadMessage.userRecieve")
    Socket.emit("send-message", allMessages)
    res.json(messageRecord)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error.message)
  }
}

const deleteMessages = async (req, res) => {
  try {
    await messages.deleteMany()
    res.json("The Messages is Deleted")
  } catch (error) {
    console.log(error)
    return res.status(500).json(error.message)
  }
}

module.exports = { getMsg, addMsg, deleteMessages, getMsgByUserId }
