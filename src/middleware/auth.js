const jwt= require("jsonwebtoken")
const mongoose=require("mongoose")
const blogModel=require("../models/blogModel")
var dToken

const authentication =function(req,res,next){
    try{
  let token = req.headers["X-Api-Key"];
    if (!token) token = req.headers["x-api-key"];
    if (!token) return res.status(401).send({ status: false, msg: "token must be present" });
     dToken = jwt.verify(token, "project1-group10");
    if (!dToken){
      return res.status(400).send({ status: false, msg: "token is invalid" })}
 
      next();
    }
    catch(error)
    {
      res.status(500).send({msg:"Error",error:error.message})
    }
  }


  const Authorisation = async function (req, res,next) {
    try{
    let presentPrams = req.params
    if (!presentPrams) presentPrams = req.query
    if (!presentPrams) return res.status(400).send({ status: false, msg: "no input found" })
    if (presentPrams.blogId)
        if (!mongoose.isValidObjectId(presentPrams.blogId))
            return res.status(400).send({ status: false, msg: "invalid blogId" })
    let         
    if(presentPrams.authorId)        
    if (!mongoose.isValidObjectId(presentPrams.authorId))
        return res.status(400).send({ status: false, msg: "invalid authorId" })
    let authorId = await blogModel.findOne(presentPrams).select({ _id: 0, authorId: 1 })
    if (!authorId) return res.status(404).send({ status: false, msg: "NoT found" })
    if (dToken.authorId != authorId.authorId)
        return res.status(401).send({ status: false, msg: "unauthorised" })
     

    next(authorId)
}catch(err){
  res.status(500).send({msg:"server Error",err:err.message})
}
}

module.exports = { Authorisation,authentication }


  