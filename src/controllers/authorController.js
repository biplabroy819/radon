const AuthorModel= require("../models/authorModel")

const createAuthor= async function (req, res) {
    let author = req.body
    let authorCreated = await AuthorModel.create(author)
    res.send({data: authorCreated})
}


module.exports.createAuthor= createAuthor








// const getAuthorsData= async function (req, res) {
    //     let authors = await AuthorModel.find()
    //     res.send({data: authors})
    // }
    // module.exports.getAuthorsData= getAuthorsData