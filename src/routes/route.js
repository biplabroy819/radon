const express = require('express');
const router = express.Router();
const blogController=require("../controllers/blogController") 
const middleware=require("../middleware/auth")
const authorController=require("../controllers/authorController")

//DeStractaring---------

let { authentication, Authorisation } = middleware;
let{createBlog, getBlog,updateBlog,deleteBlogById,deleteBlogByParams} =blogController;
let{createAuthor,loginAuthor} = authorController;


// author controller

// ---------- Create Author Api ---------
router.post("/authors",createAuthor)

// ---------- Login Author Api -----------
router.post("/login",loginAuthor)


//blog controller
 // ---------- Create Blog Api ------------
router.post("/blogs",authentication,createBlog)

// ---------- Get Blogs Api -------------
router.get("/blogs",authentication,getBlog)

// ------- Get Updated Blogs using blogId ------
router.put("/blogs/:blogId",authentication,Authorisation,updateBlog)

// ---------- Delete Api ---------------
router.delete("/blogs/:blogId",authentication,Authorisation,deleteBlogById)

// ---------- Delete Blogs By Query ----------
router.delete("/blogs",authentication,Authorisation,deleteBlogByParams)




module.exports = router;