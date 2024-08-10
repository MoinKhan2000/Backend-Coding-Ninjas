import express from "express";
import PostController from "./post.controller.js";
import { upload } from "../../middlewares/fileUpload.middleware.js";
const postRouter = express.Router();
const postController = new PostController();

// Route to retrieve all posts (news feed)
postRouter.get('/all', (req, res) => { postController.getAllPosts(req, res); }); //? done 

// Route to retrieve a specific post by ID
postRouter.get('/:postId', (req, res) => { postController.getPostOfId(req, res); });   //? done 

// Route to retrieve all posts for a specific user
postRouter.get('/user/:userId', (req, res) => { postController.getAllPostsOfUser(req, res); });  //? done 

// Route to create a new post
postRouter.post('/', upload.single('imageUrl'), (req, res) => { postController.createPost(req, res); });  //? done 

// Route to delete a specific post by ID
postRouter.delete('/:postId', (req, res) => { postController.deletePost(req, res); });  //? done

// Route to update a specific post by ID
postRouter.put('/:postId', upload.single('imageUrl'), (req, res) => { postController.updatePost(req, res); });  //? done

export default postRouter;
