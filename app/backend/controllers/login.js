const $authModel = require("../models/authModel")
const $bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const login = async (req, res) => {
    let { email, pass, username } = req.body

    try {
        const twoSideLoginUser = await $authModel.findOne({ email }) || await $authModel.findOne({ username })
        if (!twoSideLoginUser) throw "User Not Found"
        if (!pass) throw "Password Required"

        const checkPass = await $bcrypt.compare(pass, twoSideLoginUser.pass)
        if (!checkPass) throw "Incorrect Password"

        if (twoSideLoginUser && checkPass) {
            const tokenExpire = 300
            const setToken = jwt.sign({ id: twoSideLoginUser._id, exp: Math.floor(Date.now() / 1000) + tokenExpire }, "newToken")
            res.cookie('token', setToken, { httpOnly: true }).send({
                process: true,
                msg: "Login successfully",
                $authModel: await $authModel.findOneAndUpdate({ username: twoSideLoginUser.username }, { token: setToken }),
                userInfo: twoSideLoginUser
            })
        }
    } catch (err) {
        res.send({ process: false, msg: err })
    }
}

module.exports = login 