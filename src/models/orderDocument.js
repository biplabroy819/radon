const mongoose = require('mongoose');
const userDocument = require('./userDocument');
const objectId = mongoose.Schema.Types.objectId

const orderSchema = new mongoose.Schema( {
    user_id :{
        type:objectId,
        ref:"UserDoc"
    },
    product_id:{
        type:objectId,
        ref:"Product"
    },
    amount:Number,
    isFreeAppUser:Boolean,
    date:Date
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema)
