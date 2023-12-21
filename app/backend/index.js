const express = require("express")
const cors = require("cors")
const $server = express()
// dotenv
require("dotenv").config()

$server.use(cors())
$server.use(express.json())
$server.use(express.urlencoded({ extended: true }))
const authRouter = require("./routers/authRouter")
const cookieParser = require("cookie-parser")
$server.use(cookieParser())

// database Connection 
require("./configs/databaseConnection")(process.env.DATABASE)

// authentication router
$server.use("/api/auth", authRouter)

$server.listen(process.env.PORT,
  () => console.log(`Server Started: http://localhost:${process.env.PORT}`))