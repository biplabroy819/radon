const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");






let authorise = async function (req, res, next) {
    let token = req.headers["x-auth-token"]
    if (!token) return res.send({ status: false, msg: "token must be present in the requist header" })
    let decodedToken = jwt.verify(token, "functionup-radon")
    if (!decodedToken) return res.send({ status: false, msg: "token is not valid" })
    let userToBeModified = req.params.userId
    let userLoggedIn = decodedToken.userId
    if (userToBeModified != userLoggedIn) return res.send({ status: false, msg: "user logged is not allowed to modified" })
    let user = userModel.findById(req.params.userId)
    if (!user) {
        return res.send({ status: false, msg: "No such user exists" })
    } else {
        next()
    }
}


let userValidation = function (req, res, next) {
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
    if (!token) return res.status(404).send({ status: false, msg: "token must be present" });
    // console.log(token);


    let decodedToken = jwt.verify(token, "functionup-radon");
    if (!decodedToken)
        return res.status(401).send({ status: false, msg: "token is invalid" });
    next()
}

module.exports.userValidation = userValidation
module.exports.authorise = authorise
