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
        enum: ["male", "female", "LGBTQ"] //"falana" will give an error
    },
    isFreeAppUser:Boolean
    // age: Number,
    // isIndian: Boolean,
    // parentsInfo: {
    //     motherName: String,
    //     fatherName: String,
    //     siblingName: String
    // },
    // cars: [ String  ]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema) //users
