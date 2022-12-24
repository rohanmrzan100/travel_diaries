const mongoose = require("mongoose")



const userSchema = new mongoose.Schema({
   name:{
      type:String,
      required:true
   },
   email:{
      type:String,
      unique:true,
      required:true
   },
   image:{
      type:String,
      required:true
  },
   password:{
      type:String,
      required:true,
      minLength:6
   },
   date:{
      type:Date,
      default:Date.now()
   },
   posts:[{type:mongoose.Types.ObjectId,ref:'post',required:true}]

})



const userModel = mongoose.model('user',userSchema)

module.exports ={userModel}