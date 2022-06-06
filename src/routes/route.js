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

router.get("/getbookData", async function(req,res){
    let allUsers =await UserModel.find()
    res.send({msg:allUsers})
})

module.exports = router;
