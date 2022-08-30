const users = require("../models/users")

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const userFound = await users.findOne({ email: email })
    if (!userFound) return res.status(404).send("The User Not Find")
    if (password != userFound.password) return res.status(404).send("The Password Not Correct")
    res.json(userFound)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error.message)
  }
}

module.exports = { login }
