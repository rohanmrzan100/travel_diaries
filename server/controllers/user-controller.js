const {userModel}  = require("../model/user")
const {postModel} = require("../model/postmodel")

const {cloudinary} = require("../utils/cloudinary")

const getAllUsers = async (req,res)=>{
    try {
        const user = await userModel.find()
        if(!user){
            return   res.json({message:"No users found"})
        }
        res.json(user)
    } catch (error) {
        res.json({error:"error"})
        console.log(error);
    }

}

const userAuth = async(req,res)=>{
    try { 
        const {name,email,password} = req.body;
        if(!name){
            const user = await userModel.findOne({email:req.body.email})
            if(!user)
            {
                return res.json({message:"Email not found"})
            }       
            if(user.password.trim() === req.body.password.trim()){
                return res.status(200).json({message:"password correct",user})
            }
            return res.json({message:"Authication incorrect"})
           
        }else{
       
        if(!name || name.trim() === ''|| !email || email.trim() === ''|| password.trim().length<6 ){
            return res.json({message:"Invalid input"})
        }
        const fileString = req.body.image
        const result = await cloudinary.uploader.upload(fileString,{
            upload_preset:"my_images"

        });
        const user =  new userModel({
            image:result.url,
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        })
        const doc = await user.save()
        res.json(doc)
        }

    } catch (error) {
        res.json({error:"error"})
        console.log(error);
    }
}

const getUserByID = async (req,res)=>{
    try {
        const user = await userModel.findById(req.params.id)
        res.json(user)
    } catch (error) {
        res.json({error:"error"})
        console.log(error);
    }
}

const getPostsIDByUserID = async (req,res)=>{
    try {
        const user = await userModel.findById(req.params.id)
        const postID = user.posts
        res.json(postID)
    } catch (error) {
        res.json({error:"error"})
        console.log(error);
    }
}

module.exports = {
    getAllUsers,
    userAuth,
    getUserByID,
    getPostsIDByUserID

}