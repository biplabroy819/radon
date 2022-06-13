const { count } = require("console")
const userModel= require("../models/orderDocument")

const createOrder= async function (req, res) {
    let data = req.body
    let savedData= await userModel.create(data)
    res.send({data: savedData})
}

module.exports.createOrder= createOrder