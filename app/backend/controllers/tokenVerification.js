const jwt = require("jsonwebtoken")

const tokenVerification = async (req, res, next) => {
    let token = req.cookies.token
    try {
        let userToken = jwt.verify(token, 'newToken')
        req.$authModel = userToken
        next()
        if (userToken) {
            res.send({ process: true, msg: "Valid User", id: userToken._id })
        } else throw "Invalid Token"
    } catch (err) {
        res.clearCookie('token')
        res.send({
            process: false, msg: err
        })
    }
}

const logout = async (req, res, next) => {
    const clsCookie = res.clearCookie("token")
    if (clsCookie) res.send({ process: true, msg: "logout" })
}

module.exports = { tokenVerification, logout }