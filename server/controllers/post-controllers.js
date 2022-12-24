 const  mongoose  = require("mongoose")
const { postModel } = require("../model/postmodel")
const { userModel } = require("../model/user")
const {cloudinary} = require("../utils/cloudinary")

const addPost = async (req,res)=>{
    try {
        const user = await userModel.findById(req.body.user)
        const image = req.body.image
        const result = await cloudinary.uploader.upload(image,{
            upload_preset:"my_images"

        });
        const post = new postModel({
            title:req.body.title,
            description:req.body.description,
            location:req.body.location,
            image:result.url,
            user:req.body.user
        })
        const session = await mongoose.startSession();
        session.startTransaction();
        user.posts.push(post)
        await user.save({session})
        const doc = await post.save({session});
        session.commitTransaction();
        res.json(doc)
    } catch (error) {
        res.json({error:"error"})
        console.log(error);
    }
}



const getAllPosts = async(req,res)=>{
   try {
    const post = await postModel.find().populate('user')

    res.json(post)
   } catch (error) {
    res.json({error:"error"})
    console.log(error);
   }
}


const getByID = async(req,res)=>{
    try {
        const post = await postModel.findById(req.params.id).populate('user')
        if(!post){
            return res.json({message:"Not found"})
        }
        res.json(post)
        
    } catch (error) {
        res.json({error:"error"})
        console.log(error);
    }
}

const updatePost = async (req,res)=>{
    try {
        const user = await postModel.findByIdAndUpdate(req.params.id,{
            title:req.body.title,
            description:req.body.description,
            location:req.body.location
        },{new:true})
        res.json(user)
    } catch (error) {
        res.json({error:"error"})
        console.log(error);
    }
}

const deletePost = async(req,res)=>{
   let post;
   let user;
    try {        
        const session = await mongoose.startSession();
        session.startTransaction();
        post = await postModel.findById(req.params.id)
        user = await userModel.findById(post.user)
        console.log(user.posts);
        user.posts.pull(post)
        console.log(user.posts);
        user.save({session})
        session.commitTransaction()
        post = await postModel.findByIdAndDelete(req.params.id)
        if(!post){
            res.json({message:"Not found"})
        }
        res.json({message:"deleted successfully"})

     
        
    } catch (error) {
        res.json({error:"error"})
        console.log(error);
    }
}



module.exports = {
    getAllPosts,
    addPost,
    getByID,
    updatePost,
    deletePost
}