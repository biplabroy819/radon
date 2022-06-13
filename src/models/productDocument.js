const mongoose = require('mongoose');

const productSchema = new mongoose.Schema( {
    Name: String,
    category:String,
    price :{
        type:Number,
        required:true
    },
   
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema) 