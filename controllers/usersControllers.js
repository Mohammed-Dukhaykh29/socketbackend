const users = require("../models/users")

const getUsers = async (req, res) => {
  try {
    const alusers = await users.find()
    res.json(alusers)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error.message)
  }
}

const addUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body
    const newUser = new users({
      firstName,
      lastName,
      email,
      password,
    })
    await newUser.save()
    res.json(newUser)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error.message)
  }
}

module.exports = { getUsers, addUser }
