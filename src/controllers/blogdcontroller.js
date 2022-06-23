
const mongoose= require("mongoose")
const jwt = require("jsonwebtoken");
const authorModel= require("../models/authorModel")
const blogModel=require("../models/blogModel")

const createAuthor= async function(req,res){
   try{
      let data = req.body
      if(!data.fname)
      return res.status(400).send({status:false, msg:"fname is mandatory"})
      if(!data.lname)
      return res.status(400).send({status:false, msg:"lname is mandatory"})
      if(!data.title)
      return res.status(400).send({status:false, msg:"title is mandatory"})
      if(!data.email)
      return res.status(400).send({status:false, msg:"email is mandatory"})
      let emailCheck= await authorModel.findOne({email:data.email})
      if(emailCheck) return res.status(400).send({status:false,msg:"email already used"})
      if(!data.password)
      return res.status(400).send({status:false, msg:"password is mandatory"})
       let saveData = await authorModel.create(data)
      res.status(201).send({msg: saveData})
   }catch(err){
      console.log("This is the error :", err.message)
    res.status(500).send({ msg: "Error", error: err.message })
  }
}

const createBlog=async function(req,res){
   try{
      let data = req.body
      if(!data.title)
      return res.status(400).send({status:false, msg:"title is mandatory"})
      if(!data.body)
      return res.status(400).send({status:false, msg:"body is mandatory"})
      if(!data.authorId)
      return res.status(400).send({status:false, msg:"authorId is mandatory"})
      if (!authId)
      return res.status(401).send({status: false, msg:"unvalid Author"})
      if(!mongoose.isValidObjectId(data.authorId)) 
      return res.status(400).send({status:false,msg:"invalid author Id"})
      let authId = await authorModel.findById(data.authorId)
       if (!authId)
      return res.status(401).send({status: false, msg:"invalid Author"})
      if(!data.category)
      return res.status(400).send({status:false, msg:"category is mandatory"})

      let saveData = await blogModel.create(data)
      res.status(201).send({msg: saveData})
   }catch(err){
      console.log("This is the error :", err.message)
      res.status(500).send({ msg: "Error", error: err.message })
 }
}



const loginAuthor = async function (req, res) {
   try{
   let userName = req.body.email;
   let password = req.body.password;
   if(!userName) return res.status(400).send({status:false,msg:"please give email"})
   if(!password) return res.status(400).send({status:false,msg:"please give password"})
   let author = await authorModel.findOne({ email: userName, password: password });
   if (!author)
     return res.status(400).send({status: false,msg: "username or the password is not correct",});
     //creating token
   let token = jwt.sign(
     {
       authorId: author._id.toString(),
       projectName: "blogging-site"
     },
     "project1-group10"
   );
   res.setHeader("x-api-key", token);
   res.status(200).send({ status: true, data: token });
 }catch(err){
   console.log("This is the error :", err.message)
 res.status(500).send({ msg: "Error", error: err.message })
}
}



const getBlog=async function(req,res){
   try{
      let query=req.query
      let allBlogs=await blogModel.find({$and:[query,{isDeleted:false,isPublished:true}]})
       if(allBlogs.length==0)  return res.status(404).send({msg:"no such blog"})
       res.status(200).send({msg:allBlogs})
}
 catch(error){
          res.status(500).send({msg:"error in server",err:error.message})
   } 
   
}


const updateBlog=async function(req,res){
   try{
   let data =req.body
   let tags=data.tags
   let subcategory=data.subcategory
   let blogId=req.params.blogId
   let validBlog = await blogModel.findOne({_id:blogId},{isDeleted:false}) 
   if(!mongoose.isValidObjectId(blogId)) return res.status(400).send({status:false,msg:"invalid blog Id"})
   if(!validBlog) return res.status(404).send({status:false, msg:"no such Blog"}) 

   let updateBlog = await blogModel.findOneAndUpdate({_id:blogId},{$set:{isPublished:true,publishedAt:Date.now(),body:data.body,title:data.title},$push:{tags,subcategory}},{new:true})
   res.status(201).send({status:true, msg:updateBlog})
}
catch(err){
   res.status(500).send({msg:"error in server",err:err.message})
}
}


const deleteBlogById=async function(req,res){
   try{
      let blogid=req.params.blogId
      let findId= await blogModel.findOne({_id:blogid},{isDeleted:false}).select({_id:1})
      if(!findId){
      res.status(404).send({status: false, msg: "no such blog"})}
      else{
         let updateDelete= await blogModel.findOneAndUpdate({_id:findId._id},{$set:{isDeleted:true,deletedAt:Date.now()}},{new:true})
         console.log(updateDelete)
         res.status(200).send({status:true, msg: "blog is deleted"})}
      }
       catch(err){
      res.status(500).send({msg:"server issue",error:err.message})
  }  
}


const deleteBlogByParams=async function(req,res){
   try{
     let token = req.headers["X-Api-Key"];
      if (!token) token = req.headers["x-api-key"]

      let  getobject=req.query
      let  getData = await blogModel.find(getobject,{isDeleted:false})
      if(getData.length==0){
      return res.status(404).send({status: false,msg: "no such Blog"})
     }
     let dToken = jwt.verify(token, "project1-group10")
      
     let  updateData= await blogModel.updateMany(
      {$and:[{authorId:dToken.authorId},getobject]},

      {$set:{isDeleted:true,deletedAt:Date.now()}},
      {new:true})
      console.log(getobject)
      res.status(200).send({msg:updateData})
   }
catch(err){
   res.status(500).send({msg:"server issue",detail:err.message}) 
}
}


module.exports={
   createAuthor,
   createBlog,
   loginAuthor,
   getBlog,
   updateBlog,
   deleteBlogById,
   deleteBlogByParams}
