const mongoose = require("mongoose")
const Schema = mongoose.Schema

const usersSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
})

const users = mongoose.model("user", usersSchema)
module.exports = users
