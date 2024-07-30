import { ApplicationError } from "../../middlewares/errorHandler.middleware.js";
import CommentModel from "./comment.model.js";

ApplicationError
export class CommentController {
  getAllCommentsForPost(req, res, next) {
    const { id: postId } = req.params;
    try {
      const comments = CommentModel.getAllCommentsForPost(parseInt(postId));
      return res.status(200).json(comments);
    } catch (error) {
      if (error instanceof ApplicationError) {
        return res.status(error.code).send(error.message);
      }
      next(error); // Pass to global error handler
    }
  }

  addComment(req, res, next) {
    const { id: postId } = req.params;
    const { content } = req.body;
    const userId = req.userId;
    try {
      const newComment = CommentModel.addComment(userId, parseInt(postId), content);
      return res.status(201).json(newComment);
    } catch (error) {
      if (error instanceof ApplicationError) {
        return res.status(error.code).send(error.message);
      }
      next(error); // Pass to global error handler
    }
  }

  deleteComment(req, res, next) {
    const { id: commentId } = req.params;
    try {
      const deletedComment = CommentModel.deleteCommentById(parseInt(commentId));
      return res.status(200).json(deletedComment);
    } catch (error) {
      if (error instanceof ApplicationError) {
        return res.status(error.code).send(error.message);
      }
      next(error); // Pass to global error handler
    }
  }

  updateComment(req, res, next) {
    const { id: commentId } = req.params;
    const { content } = req.body;
    try {
      const updatedComment = CommentModel.updateCommentById(parseInt(commentId), content);
      return res.status(200).json(updatedComment);
    } catch (error) {
      if (error instanceof ApplicationError) {
        return res.status(error.code).send(error.message);
      }
      next(error); // Pass to global error handler
    }
  }

  getPaginatedComments(req, res, next) {
    const { id: postId } = req.params;
    const { page, limit } = req.query;
    try {
      const paginatedComments = CommentModel.getPaginatedComments(parseInt(postId), parseInt(page), parseInt(limit));
      return res.status(200).json(paginatedComments);
    } catch (error) {
      if (error instanceof ApplicationError) {
        return res.status(error.code).send(error.message);
      }
      next(error); // Pass to global error handler
    }
  }
}

export default CommentController;
