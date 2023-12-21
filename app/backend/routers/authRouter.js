const express = require("express")
const registerUser = require("../controllers/registerUser")
const login = require("../controllers/login")
const { tokenVerification, logout } = require("../controllers/tokenVerification")
const { upload } = require("../configs/multer")
const adminLogin = require("../controllers/adminLogin")

const authRouter = express.Router()

// require registerUser.js
authRouter.route("/register").post(upload.single('avatar'), registerUser)

// require login.js
authRouter.route("/login").post(login)

// token verification
authRouter.route("/token").get(tokenVerification)

// logout
authRouter.route("/logout").post(logout)

// Auth Login
authRouter.route("/admin").post(adminLogin)

module.exports = authRouter
