const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const userRouter = require('./routes/userRouter');

//middlewares
app.use(express.json());

//Connect to the database. the username and password is safe in .env file
mongoose.connect(process.env.DB_URI,{
    useNewUrlParser : true,
    useUnifiedTopology : true
})

//To check if databse connected
const db = mongoose.connection;
db.once('open', () => console.log('connected to db'))


//Routers 

//For user endpoint
app.use('/user',userRouter);

//Start server
app.listen(process.env.port,()=>{
    console.log(`server is running ${process.env.port}`);
})

