const router = require('express').Router();
const Product = require('../models/productModel')

//get prducts by sub-categories
router.get('/:sub_category',(req,res)=>{

    let subCat = req.params.sub_category
    Product.find({sub_category:subCat}).then((result)=>{
        res.status(200).json(result)
    }).catch((err)=>{
        res.status(400).json({"Error":err})
    })
    // res.send(subCat)
})

module.exports = router;