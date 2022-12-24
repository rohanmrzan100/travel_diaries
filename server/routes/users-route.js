const express= require('express');
const userRouter = express.Router();
const {
    getAllUsers,
    userAuth,
    getUserByID,getPostsIDByUserID
} = require('../controllers/user-controller')


userRouter.route("/")
    .get(getAllUsers)

userRouter.route("/:id/posts")
    .get(getPostsIDByUserID)


userRouter.route("/:id")
    .get(getUserByID)


userRouter.route("/signup")
    .post(userAuth)


userRouter.route("/login")
    .post(userAuth)

module.exports = userRouter