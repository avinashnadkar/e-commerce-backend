const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    Fruits_and_Vegetables : [{
        sub_category : {type : String},
        param : {type : String}
    }],
    Dairy_and_Bakery : [{
        sub_category : {type : String},
        param : {type : String}
    }],
    Staples : [{
        sub_category : {type : String},
        param : {type : String}
    }],
    Men : [{
        sub_category : {type : String},
        param : {type : String}
    }],
    Women: [{
        sub_category : {type : String},
        param : {type : String}
    }]
})

const Category = mongoose.model("Category",categorySchema);

module.exports = Category;