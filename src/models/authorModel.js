const mongoose = require('mongoose');

//authorsSchema  
const authorsSchema = new mongoose.Schema( {
    author_id:{
        type:Number,
        require :true,
        unique :true
    },
    author_name :String,
    age :Number,
    address:String

}, { timestamps: true });

module.exports = mongoose.model('author', authorsSchema)