const messages = require("../models/messagesEmail")
const getMsg = async (req, res) => {
  try {
    const msg = await messages.find()
    res.json(msg)
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message)
  }
}

const getMsgByUserId = async (req, res) => {
  try {
    const msg = await messages.find({ userReceive: req.params.id })
    res.json(msg)
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message)
  }
}

const addMsg = async (req, res) => {
  try {
    const { desc, userReceive } = req.body
    const newMsg = new messages({
      desc,
      userReceive,
    })
    await newMsg.save()
    // socket.emit("notification", newMsg)
    res.json(newMsg)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error.message)
  }
}

const deleteMessages = async (req, res) => {
  try {
    await messages.deleteMany({ name: "Ahmed" })
    res.json("The Messages is Deleted")
  } catch (error) {
    console.log(error)
    return res.status(500).json(error.message)
  }
}

module.exports = { getMsg, addMsg, deleteMessages, getMsgByUserId }
