import express from 'express';
import loggerMiddleware from '../../middlewares/loggerHandler.middleware.js';
import { LikeController } from './like.controller.js';
const likeRoutes = express.Router();
const likeController = new LikeController();

likeRoutes.use(loggerMiddleware);

likeRoutes.get('/toggle-like/:postId', likeController.toggleLike);  // done 
likeRoutes.get('/is-liked/:postId', likeController.isPostLiked);    // done 
likeRoutes.get('/likes/:postId', likeController.getLikesForPost);   // done 
likeRoutes.get('/user-likes/', likeController.getLikesForUser);     // done

export default likeRoutes;
