const router = require('express').Router();
require('dotenv').config();
let User = require('../models/userModel');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken')

//Login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    let user = await User.findOne({ email: email });
    if (!user) return res.status(400).send('Invalid Email or Password.')

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

//Register user

router.post('/register', async (req,res)=>{
    
    //hash password before post
    let hashedPasswrod = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
        name: req.body.name,
        password: hashedPasswrod,
        address: req.body.address,
        email: req.body.email,
    })

    //Create new JWT token (throwing error at this time need to be resolved)
    let name = req.body.name
    const token = JWT.sign({
        name
    }, process.env.KEY, {
        expiresIn: 72000000
    })

    //post data in database
    newUser.save()
    .then((user) => {
        res.json({
            status: "success",
            code: 200,
            message: "Welcome to onlineShop.",
            results: {
                token: token,
                u_id: user._id,
                name: user.name,
                username: user.username
            }
        })
    }).catch((err) => {
        res.status(400).json("error :" + err)
    })
})

module.exports = router;