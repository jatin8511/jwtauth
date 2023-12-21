# 🎓 Authentication

## ⚙️ Installation Dependency

#### 🔺 Frontend
- npm create vite
- npm install
- npm install react-router-dom
- npm install axios
- npm install react-icons
- npm install react-toastify
- npm install js-cookie

#### 🔺 backend
- npm init
- npm install express
- npm install cors
- npm install dotenv
- npm install mongoose
- npm install bcryptjs
- npm install cookie-parser
- npm install jsonwebtoken
- npm install multer
- npm install cloudinary
- npm install multer-storage-cloudinary

****
****
****

## 📌 Backend

### 🔺 Server listening and database connection

#### Create `.env` file

```js
PORT = 1080
DATABASE = "mongodb://127.0.0.1:27017/authdoc"
```

#### Database Connection

`/configs/databaseConnection.js`

```js
module.exports = async URL => await require("mongoose")
    .connect(URL)
    .then(console.log("Connected Database..."));
```

#### server listening and database connection in `index.js`

`index.js`

```js
const express = require("express")
const cors = require("cors")
const $server = express()
$server.use(cors())
$server.use(express.json())
$server.use(express.urlencoded({ extended: true }))

// require dotenv
require("dotenv").config()
// require databaseConnection 
require("./configs/databaseConnection")(process.env.DATABASE)

const PORT = process.env.PORT
$server.listen(PORT, () => console.log(`Server Started: http://localhost:${PORT}`))
```

****
****

### 🔺 Create Schema and module

`/modules/authModel.js`

```js
const mongoose = require("mongoose")

const authSchema = mongoose.Schema({
    username: { type: String },
    email: { type: String },
    pass: { type: String },
    conPass: { type: String },
    token: { type: String, default: "defaultToken" }
})

const authModule = mongoose.model("authData", authSchema)

module.exports = authModule
```

****
****

### 🔺Register user account

`/controllers/registerUser.js`

```js
const $authModel = require("../models/authModel")
const $bcrypt = require("bcryptjs")

const registerUser = async (req, res) => {
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

        if (username, email, pass) {
            const userSuccessMsg = `Hello ${username}, You are register Successfully.`
            res.send({
                process: true, msg: userSuccessMsg, $authModel: await $authModel({
                    username, email, pass: await $bcrypt.hash(pass, 10)
                }).save()
            })
        }
    } catch (err) {
        res.send({ process: false, msg: err })
    }
}

module.exports = registerUser
```

****
****

### 🔺 Setup router

`/router/authRouter.js`

```js
const express = require("express")
const registerUser = require("../controllers/registerUser")

const authRouter = express.Router()

// require registerUser.js
authRouter.route("/register").post(registerUser)

module.exports = authRouter

```

#### Use router in `index.js`

`index.js`

```js
const authRouter = require("./routers/authRouter")

// authentication router
$server.use("/api/auth", authRouter)
```

****
****

### 🔺 Using postman with post register data

- Now ready to user register post data from :-
  
  `http://localhost:1080/api/auth/register`


- urlencoded method

<img src="./assets/userRegisterData_PostMethod.png" alt="userPostData With postman" />

- This also use method :- json row data parse

```json
{
    "username": "JohnDoe",
    "email": "John@example.com",
    "pass": "john123",
    "conPass": "john123"
}
```

****
****

### 🔺  Login User

`/controllers/login.js`

```js
const $authModel = require("../models/authModel")
const $bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const login = async (req, res) => {
    let { email, pass, username } = req.body
    console.log(req.body);

    try {
        const twoSideLoginUser = await $authModel.findOne({ email }) || await $authModel.findOne({ username })
        if (!twoSideLoginUser) throw "Enter email or username"
        if (!pass) throw "Password Required"

        const checkPass = await $bcrypt.compare(pass, twoSideLoginUser.pass)
        if (!checkPass) throw "Incorrect Password"

        if (twoSideLoginUser && checkPass) {
            const tokenExpire = 60
            const setToken = jwt.sign({ id: twoSideLoginUser._id, exp: Math.floor(Date.now() / 1000) + tokenExpire }, "defaultToken")

            res.cookie('token', setToken, { httpOnly: true }).send({
                process: true,
                msg: "Login successfully",
                twoSideLoginUser: await $authModel.findByIdAndUpdate(twoSideLoginUser._id, { setToken })
            })
        }
    } catch (err) {
        res.send({ process: false, msg: err })
    }
}

module.exports = login
```

**`login.js` require in `authRouter.js`**

`/router/authRouter.js`

```js
const express = require("express")
const registerUser = require("../controllers/registerUser")
const login = require("../controllers/login")
const tokenVerification = require("../controllers/tokenVerification")

const authRouter = express.Router()

// require registerUser.js
authRouter.route("/register").post(registerUser)

// require login.js
authRouter.route("/login").post(login)

module.exports = authRouter
```

****
****

### 🔺 Token verification

`/controllers/tokenVerification.js`

```js
const jwt = require("jsonwebtoken")

const tokenVerification = async (req, res) => {
    let token = req.cookies.token

    try {
        let userToken = jwt.verify(token, 'defaultToken')

        if (userToken) {
            res.send({
                process: true,
                msg: "Valid User",
                id: userToken._id
            })
        } else throw "Invalid Token"
    } catch (err) {
        res.send({
            process: false, msg: err
        })
    }
}

module.exports = tokenVerification
```

**`tokenVerification.js` require in `authRouter.js`**

`/router/authRouter.js`

```js
const express = require("express")
const registerUser = require("../controllers/registerUser")
const login = require("../controllers/login")
const tokenVerification = require("../controllers/tokenVerification")

const authRouter = express.Router()

// require registerUser.js
authRouter.route("/register").post(registerUser)

// require login.js
authRouter.route("/login").post(login)

// token verification
authRouter.route("/token").get(tokenVerification)

module.exports = authRouter
```