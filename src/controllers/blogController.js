const mongoose = require("mongoose")
const authorModel = require("../models/authorModel")
const blogModel = require("../models/blogModel")




//  ========================================== CREATE BLOCK ====================================

const createBlog = async function (req, res) {
   try {
      let data = req.body
      if (Object.keys(data).length == 1) return res.status(404).send({ status: false, msg: "Provide data" })

      if (!data.title)
         return res.status(400).send({ status: false, msg: "title is mandatory" })
      if (typeof data.title != "string")
         return res.status(400).send({ status: false, msg: "Enter your valid Title" })
      let Title = data.title.trim()
      if (Title.length === 0)
         return res.status(400).send({ status: false, msg: "Enter your Title " })

      if (!data.body)
         return res.status(400).send({ status: false, msg: "body is mandatory" })
      if (typeof data.body != "string")
         return res.status(400).send({ status: false, msg: "give some inputs " })
      let Body = data.body.trim()
      if (Body.length === 0)
         return res.status(400).send({ status: false, msg: "Enter inputs at Body " })

      if (!data.authorId)
         return res.status(400).send({ status: false, msg: "authorId is mandatory" })
      if (typeof data.authorId != "string")
         return res.status(400).send({ status: false, msg: "give valid authorId " })
      if (!mongoose.isValidObjectId(data.authorId))
         return res.status(400).send({ status: false, msg: "invalid author Id" })
      let authId = await authorModel.findById(data.authorId)
      if (!authId)
         return res.status(401).send({ status: false, msg: " Author not found " })
      if (req.body.tokenId != data.authorId)
         return res.status(400).send({ status: false, msg: "you are not allow" })

      if (!data.category)
         return res.status(400).send({ status: false, msg: "category is mandatory" })
      if (typeof data.category != "string")
         return res.status(400).send({ status: false, msg: "Enter your valid Category" })
      let Category = data.category.trim()
      if (Category.length === 0)
         return res.status(400).send({ status: false, msg: "Enter Category " })

      let saveData = await blogModel.create(data)

      res.status(201).send({ status: true, data: saveData })
   } catch (err) {

      res.status(500).send({ status: false, msg: err.message })
   }
}

//  ========================================== GET BLOCK ====================================

const getBlog = async function (req, res) {
   try {
      let query = req.query
      let allBlogs = await blogModel.find({ $and: [query, { isDeleted: false, isPublished: true }] })
      if (allBlogs.length == 0) return res.status(404).send({ msg: "no such blog" })
      res.status(200).send({ status: true, data: allBlogs })
   }
   catch (error) {
      res.status(500).send({ status: false, msg: error.message })
   }

}




//  ========================================== UPDATE BLOCK ====================================


const updateBlog = async function (req, res) {
   try {
     let blogId = req.params.blogId;
     let { title, body, tags, subCategory } = req.body;
     const date = Date.now();
 
     if (!blogId)
       return res.status(404).send({
         status: false,
         msg: "Blog Is Not Found , Please Enter Valid Blog Id",
       });
 
     if (Object.keys(req.body).length == 0)
       return res
         .status(400)
         .send({ status: false, msg: "Body Must be filled" });
     if (title == 0)
       return res
         .status(400)
         .send({ status: false, msg: "Value of the title must be present" });
     if (body == 0)
       return res
         .status(400)
         .send({ status: false, msg: "Value of the body must be present" });
     if (tags == 0)
       return res
         .status(400)
         .send({ status: false, msg: "Value of the tags must be present" });
     if (subCategory == 0)
       return res.status(400).send({
         status: false,
         msg: "Value of the subCategory must be present",
       });
     let updateQuery = {
       title: title,
       body: body,
     };
 
     let addQuery = { tags: tags, subCategory: subCategory };
     const allBlogs = await blogModel.findOne({
       $and: [{ isDeleted: false }, { isPublished: true }],
     });
     if (!allBlogs)
       return res
         .status(404)
         .send({ status: false, msg: "No filter possible are available" });
     console.log(allBlogs);
 
     // WE ARE FINDING ONE BY BLOG ID AND UPDATING //
     let updatedblog = await blogModel.findOneAndUpdate(
       { _id: blogId },
       { $set: updateQuery, $push: addQuery, publishedAt: date },
       { new: true }
     );
     console.log(updatedblog);
     res.status(200).send({
       status: true,
       msg: "Blog is Updated Successfully",
       data: updatedblog,
     });
   } catch (err) {
     res.status(500).send({ status: false, msg: err.message });
   }
 };



//  ========================================== DELETE BLOCK ====================================




const deleteBlogById = async function (req, res) {
   try {
      let blogid = req.params.blogId
      let findId = await blogModel.findOne({ _id: blogid, isDeleted: false }).select({ _id: 1 })
      if (!findId) {
         res.status(404).send({ status: false, msg: "no such blog" })
      }
      else {
         let updateDelete = await blogModel.findOneAndUpdate({ _id: findId._id }, { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true })
         console.log(updateDelete)
         res.status(200).send({ status: true, msg: "blog is deleted" })
      }
   }
   catch (err) {
      res.status(500).send({ status: false, msg: err.message })
   }
}




//  ========================================== DELETEBY QUARY BLOCK ====================================

const deleteBlogByParams = async function (req, res) {
   try {

      let getobject = req.query

      let updateData = await blogModel.updateMany(
         { $and: [{ authorId: req.body.tokenId }, { isDeleted: false }, getobject] }, { $set: { isDeleted: true, deletedAt: Date.now() } },
         { new: true })

      if (!updateData.modifiedCount)

         return res.staus(400).send({ status: false, msg: "no such blog" })

      res.status(200).send({ status: true, msg: "numbers of delated blog= " + updateData.modifiedCount })
   }
   catch (err) {
      res.status(500).send({ status: false, msg: err.message })
   }
}


module.exports = {
   createBlog,
   getBlog,
   updateBlog,
   deleteBlogById,
   deleteBlogByParams
}
