import express from 'express';
import CommentController from './comment.controller.js';
import loggerMiddleware from '../../middlewares/loggerHandler.middleware.js';

const commentRoutes = express.Router();
const commentController = new CommentController();

commentRoutes.use(loggerMiddleware);

commentRoutes.get('/:id', commentController.getAllCommentsForPost);
commentRoutes.post('/:id', commentController.addComment);
commentRoutes.delete('/:id', commentController.deleteComment);
commentRoutes.put('/:id', commentController.updateComment);
commentRoutes.get('/:id/paginated', commentController.getPaginatedComments);

export default commentRoutes;
