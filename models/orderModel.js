const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId : {type : String, required:true},
    products : [{
        name : {type : String, required:true},
        price : {type : Number, required:true},
        discount : {type : Number, required:true},
        img : {type : String, required:true},
        quantity : {type : Number, required:true},
    },{ _id : false }],
    totalMrp : {
        type : Number,
        required : true
    },
    totalDiscount : {
        type : Number,
        required:true
    },
    totalPrice : {
        type : Number,
        required:true
    },
    isDeliverd : {
        type : Boolean,
        default : false,
        required : true
    },
    orderDate : {
        type : Date,
        default : Date.now
    },
    deliveryDate : {
        type : Date,
    }
})

const Orders = mongoose.model("Orders",orderSchema);

module.exports = Orders;