const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unque: true
    },
    pass: {
        type: String,
        require: true
    },
    token: {
        type: String, default: 'jatinRaval'
    }
})

const User = mongoose.model('users', userSchema)
module.exports = User