
const mongoose = require('mongoose');
//Books Schema
const booksSchema = new mongoose.Schema( {
    name : String,
    author_id:{
        type:Number,
        require :true
    },
    price :Number,
    rating: Number

}, { timestamps: true });




module.exports = mongoose.model('book', booksSchema)





































