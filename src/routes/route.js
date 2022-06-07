const express = require('express');
const router = express.Router();
const UserModel= require("../models/userModel.js")
// const UserController= require("../controllers/userController");
const res = require('express/lib/response');

// router.get("/test-me", function (req, res) {
//     res.send("My first ever api!")
// })






router.post("/createbook",async function(req, res)  {
    let data = req.body;
    let savedData =await UserModel.create(data)
    res.send({msg:savedData})
})

router.get("/bookList", async function(req,res){
    let allUsers =await UserModel.find().select({ bookName: 1, authorName: 1, _id: 0})
    res.send({msg:allUsers})
})

router.get("/getBooksInYear", async function(req,res){
    let allUsers2 =await UserModel.find({year:2022})
    res.send({msg:allUsers2})
})

router.get("/getRandomBooks", async function(req,res){
    let allUsers4 =await UserModel.find({totalPages: { $gt:500 }  })
    res.send({msg:allUsers4})
})

router.get("/getXINRBooks", async function(req,res){
    let allUsers3 =await UserModel.find({$or: [ {"indianPrice" :"100INR" } , {  "indianPrice" :"200INR"} , { "indianPrice" :"500INR"}]})
    res.send({msg:allUsers3})
})


module.exports = router;
