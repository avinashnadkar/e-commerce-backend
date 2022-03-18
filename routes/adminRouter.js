const router = require('express').Router();
require('dotenv').config();
let User = require('../models/userModel');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken')

//Admin login feature
router.post('/login',async (req,res)=>{

    const { email, password } = req.body;

    let user = await User.findOne({ email: email });

    if (!user) return res.status(400).send('Invalid Email or Password.')

     if (!user.adminRole) return res.status(400).json({'msg' : 'Not authorized for admin role.'})
    console.log(user.adminRole);

    let isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return res.status(400).json({
            "errors": [{ "msg": "invalid credentials" }]
        })
    }

    //Create new JWT token 
    let name = email
    const token = JWT.sign({
        name
    }, process.env.KEY, {
        expiresIn: 72000000
    })

    res.json({
        status: "success",
        code: 200,
        message: "Welcome to onlineShop.",
        results: {
            token: token,
            u_id: user._id,
            name: user.name,
            email: user.email,
            address: user.address,
        }
    })
})

module.exports = router;