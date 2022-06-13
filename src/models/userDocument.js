const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
    Name: String,
    Balance:Number,
    Address: {
        type: String,
        unique: true,
        required: true
    },
    age :Number,
    gender: {
        type: String,
        enum: ["male", "female", "LGBTQ"] 
    },
    isFreeAppUser:{
        type:Boolean,
        default:false,
    }
}, { timestamps: true });

module.exports = mongoose.model('UserDoc', userSchema) 