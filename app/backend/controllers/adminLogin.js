const $authModel = require("../models/authModel")

const adminLogin = async (req, res) => {
  const { username, email, pass } = req.body
  const matchAuth = await $authModel.findOne({ email }) || await $authModel.findOne({ username })

  try {
    if (!matchAuth) throw "enter username or email"
  } catch (msg) {
    res.send({ process: false, msg: msg })
  }

}

module.exports = adminLogin