const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Register = async (req, res) => {
    console.log(req.body)
    let { name, email, pass } = req.body
    let existingUser = await User.findOne({ email })
    try {
        if (!name) throw 'name required'
        if (!email) throw 'email required'
        if (!pass) throw 'pass required'
        if (existingUser) throw 'user already exists'

        if (name, email, pass) {
            let hashedPass = await bcrypt.hash(pass, 10)
            if (!existingUser) {
                let data = User({
                    name, email, pass: hashedPass
                })
                let result = await data.save()
                res.send({ success: true, msg: 'user registered successfully', user: result })
            }
        }
    } catch (e) {
        res.send({ success: false, mag: e })
    }

}
const Login = async (req, res) => {

    let { email, pass } = req.body
    console.log(email, pass)
    try {
        if (!email) throw 'email requird'
        if (!pass) throw 'password requird'

        let user = await User.findOne({ email })
        let checkedPass = await bcrypt.compare(pass, user.pass)

        if (user && checkedPass) {

            let token = jwt.sign({ id: user._id }, 'hellomynameisjatin', {
                expiresIn: 300000
            })
      
            let updatedUser =await User.findByIdAndUpdate(user._id, { token })

            res
                .cookie('token', token,{httpOnly:true})
                .send({ success: true, mag: 'user registered successfully', user: updatedUser })
        }
    } catch (e) {
        res.send({ success: false, msg: e })
    }
}
module.exports = { Register, Login }