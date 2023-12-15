// sudo systemctl start mongodb ===> use this command to start mongo db in linux
const express = require('express')
const app= express()
const dotenv= require('dotenv')
dotenv.config()
require('./config/conn')
const userRouter = require('./routes/userRoutes')
app.use(express.json())
const cors = require('cors')
app.use(cors())
app.use('/api/auth',userRouter)
let PORT = process.env.PORT
app.listen(PORT,()=>console.log('app is running on 8080'))