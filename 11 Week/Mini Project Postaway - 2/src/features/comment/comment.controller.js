import { CommentRepository } from "./comment.repository.js";

export default class CommentController {

  constructor() {
    this.commentRepository = new CommentRepository();
  }

  // Get all comments of a specific post
  async getCommentOfPost(req, res, next) {
    try {
      const { postId } = req.params;
      const comments = await this.commentRepository.getCommentOfPost(postId);
      res.status(200).json(comments);
    } catch (error) {
      res.status(error.code || 500, error.message || 'Something went wrong')
    }
  }

  // Create a new comment
  async createComment(req, res, next) {
    try {
      const { postId } = req.params;
      const { content } = req.body;
      const userId = req.userId;
      const newComment = await this.commentRepository.createComment(postId, userId, content);
      res.status(201).json(newComment);
    } catch (error) {
      res.status(error.code || 500, error.message || 'Something went wrong')
    }
  }

  // Update an existing comment
  async updateComment(req, res, next) {
    try {
      const { commentId } = req.params;
      const { content } = req.body;
      const userId = req.userId;
      const updatedComment = await this.commentRepository.updateComment(commentId, userId, content);
      res.status(200).json(updatedComment);
    } catch (error) {
      res.status(error.code || 500, error.message || 'Something went wrong')
    }
  }

  // Delete a comment
  async deleteComment(req, res, next) {
    try {
      const { commentId } = req.params;
      const userId = req.userId;
      const result = await this.commentRepository.deleteComment(commentId, userId);
      console.log(result);

      return res.status(200).send(result);
    } catch (error) {
      console.log(error);
      return res.status(error.code || 500, error.message || 'Something went wrong')
    }
  }

}
