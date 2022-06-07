

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName :{
        type:String,
        require :true
    },
    prices:{
        indianPrice :String,
        europeanPrice :String,
    },
    year:{type:Number,default:2021},
    authorName:String,
    totalPages:Number,
    tags:[String],
    stackAvailable:Boolean,

}, { timestamps: true });

module.exports = mongoose.model('book', bookSchema) //users

