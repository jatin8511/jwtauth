const $authModel = require("../models/authModel")
const $bcrypt = require("bcryptjs")
const { cloudinary } = require('../configs/multer')

const registerUser = async (req, res) => {

    let avatar = req.file
    const { username, email, pass, conPass } = req.body
    const existingEmail = await $authModel.findOne({ email })
    const existingUsername = await $authModel.findOne({ username })

    try {
        if (existingEmail) throw "This email is already exist"
        if (existingUsername) throw "This username is already exist"
        if (!username) throw "Username is require"
        if (!email) throw "Email is require"
        if (!pass) throw "Password is required"
        if (!conPass) throw "Confirm password is require"
        if (pass !== conPass) throw "Does not match password and confirm password"

        if (username || email || pass) {
            const userSuccessMsg = `Hello ${username}, You are register Successfully.`

            if (!avatar) {
                res.send({
                    process: true, msg: userSuccessMsg, $authModel: await $authModel({
                        username, email, avatar: $authModel.avatar, pass: await $bcrypt.hash(pass, 10)
                    }).save()
                })
            }

            if (avatar) {
                let image = await cloudinary.uploader.upload(req.file.path)
                if (!image) throw 'failed to store image in cloud'
                res.send({
                    process: true, msg: userSuccessMsg, $authModel: await $authModel({
                        username, email, avatar: image.secure_url, pass: await $bcrypt.hash(pass, 10)
                    }).save()
                })
            }
        }
    } catch (err) {
        res.send({ process: false, msg: err })
    }
}

module.exports = registerUser