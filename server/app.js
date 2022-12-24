const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const cors = require('cors')
const userRouter = require('./routes/users-route')
const postRouter = require("./routes/post-route")


mongoose.set('strictQuery', true);
app.use(express.urlencoded({extended:true,limit:'50mb'}))
app.use(express.json({limit:'50mb'}));
app.use(cors());
app.use("/user",userRouter)
app.use("/posts",postRouter)




mongoose.connect(`mongodb+srv://rohanmrzan100:${process.env.MONGODB_PW}@cluster0.8eze3i1.mongodb.net/travelDiaries`,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
        .then(()=>{
            const port = process.env.port || 3001
            app.listen(3001,()=>{
                console.log(`APP is running on port ${port}`);
            })
        })
        .catch((err)=>console.log(err))
