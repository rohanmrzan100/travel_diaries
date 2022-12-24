const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    }, 
    date:{
        type:Date,
        default:Date.now()
        },
    user:{type:mongoose.Types.ObjectId,ref:'user',required:true}
})


const postModel = mongoose.model('post',postSchema)


module.exports = {
    postModel
}