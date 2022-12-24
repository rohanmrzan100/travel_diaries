const express = require("express")
const postRouter = express.Router()

const {
    getAllPosts,
    addPost,
    getByID,
    updatePost,
    deletePost
} = require("../controllers/post-controllers")



postRouter.route("/")
    .get(getAllPosts)

postRouter.route("/add_post")
    .post(addPost)

postRouter.route("/:id")
    .get(getByID)
    
    .delete(deletePost)

postRouter.route("/:id/edit")
.patch(updatePost)


module.exports = postRouter