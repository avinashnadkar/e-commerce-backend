const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    img:{
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    Price : {
        type : Number,
        required : true
    },
    discount : {
        type : Number,
        default : 0
    },
    quantity : {
        type : Number,
        default : 0
    },
    inventoryQty : {
        type : Number,
        required:true
    },
    discription : {
        type : String
    },
    category : {
        type : String
    },
    sub_category : {
        type : String
    }

})

const Product = mongoose.model("Product",productSchema);

module.exports = Product;
