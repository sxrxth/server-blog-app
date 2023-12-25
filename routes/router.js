const express = require('express')
const router=new express.Router()
const userController = require('../controllers/userController')
const postController = require('../controllers/postController')
const multerConfig = require('../middleWares/multerMiddleware')

const jwtMiddleWare = require('../middleWares/jwtMiddleware')

// register API
router.post('/user/register',userController.register)
// login API
router.post('/user/login',userController.login)
// update user
router.put('/user/edituser',jwtMiddleWare,multerConfig.single("profile"),userController.editUserController)
// addposts
router.post('/post/add',jwtMiddleWare,multerConfig.single('image'),postController.addPost)
//getUserpost
router.get('/user/all-posts',jwtMiddleWare,postController.allUserPosts) 
//getAllpost
router.get('/post/all',postController.getAllPosts) 
//getHomepost
router.get('/post/home-posts',postController.getHomePosts) 
// edit post
router.put('/post/edit/:id',jwtMiddleWare,multerConfig.single("image"),postController.editPostController)
// delete post
router.delete('/post/remove/:id',jwtMiddleWare,postController.deletePostController)

module.exports=router
