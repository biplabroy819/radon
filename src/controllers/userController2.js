const { count } = require("console")
const userModel= require("../models/userDocument")






const createUser= async function (req, res) {
    let data = req.body
    let savedData= await userModel.create(data)
    res.send({data: savedData})
}

module.exports.createUser= createUser
const basicCode= async function(req, res, next) {
    let tokenDataInHeaders= req.headers.token
    console.log(tokenDataInHeaders)

    console.log( "HEADER DATA ABOVE")
    console.log( "hey man, congrats you have reached the Handler")
    //res.send({ msg: "This is coming from controller (handler)"})
    next()
    }