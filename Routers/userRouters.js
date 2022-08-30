const express = require("express")
const { getUsers, addUser } = require("../controllers/usersControllers")

const userRouters = express.Router()

userRouters.get("/", getUsers)

userRouters.post("/", addUser)

module.exports = userRouters
