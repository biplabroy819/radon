const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const newPublisher = require("../models/newPublisher")

const createBook= async function (req, res) {
    let bookData = req.body
    let authorId = bookData.author_id
    //condition 1
    if(!authorId) res.send("Author id is required")
    //condition 2
    let pubId = bookData.publisher_id
    if(!pubId) res.send("Publisher id is required")
    
    //Condition 3
    let savedAuthData = await authorModel.findById(authorId)
    if(!savedAuthData) res.send("Invalid author Id")
    //condition 4
    let savedPubData = await newPublisher.findById(pubId)
    if(!savedPubData) res.send("Invalid Publisher id")
    
    
    let bookCreated = await bookModel.create(bookData)
    res.send({data: bookCreated})
}

const getAllBooks = async function (req, res) {
    let savedData = await bookModel.find().populate(['author_id','publisher_id'])
    res.send(savedData)
}


module.exports.createBook= createBook
module.exports.getAllBooks= getAllBooks
















// const getBooksData= async function (req, res) {
//     let books = await bookModel.find()
//     res.send({data: books})
// }

// const getBooksWithAuthorDetails = async function (req, res) {
//     let specificBook = await bookModel.find().populate('author_id')
//     res.send({data: specificBook})

// }
// module.exports.getBooksData= getBooksData
// module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails
