const router = require('express').Router();
const JWT = require('jsonwebtoken');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
let ObjectId = require('mongodb').ObjectID;
const checkAuth = require('../middlewares/checkAuth');

router.get('/:user_id', checkAuth, (req,res)=>{

})

router.post('/add', checkAuth, (req,res)=>{
  
  let productArr = []
  let qtyArr = []

  for(let i=0;i<req.body.products.length;i++){
      productArr[i] = ObjectId(req.body.products[i].prodId)
      qtyArr[i] = {quantity : req.body.products[i].qty}
  }

    Product.find({
        _id: {
            $in: [...productArr]
        }
    }).then((result)=>{

        //calculate total discount, price and qty before saving in database
        let mrp = 0;
        let discount = 0;
        let price = 0;
        for(var j=0;j<result.length;j++){
            result[j].quantity = qtyArr[j].quantity
            mrp +=  qtyArr[j].quantity * result[j].price;
            discount +=  qtyArr[j].quantity *  result[j].discount;
            console.log(result[j].price, result[j].inventoryQty)
        }
        price = mrp - discount

        let order = new Order({
            userId : req.body.userId,
            products : [...result],
            totalMrp : mrp,
            totalDiscount : discount,
            totalPrice :price
        })

        //save order in database
        order.save()
        .then(() => {
            res.status(200).json({
                msg: "Order successfully added"
            })
        }).catch((err) => {
            res.status(400).json("error :" + err)
        })
    }).catch((err)=>{
        console.log(err)
    })
})

module.exports = router;