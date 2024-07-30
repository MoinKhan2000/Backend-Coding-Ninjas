import PostModel from "../post/post.model.js";
import { ApplicationError } from "../../middlewares/errorHandler.middleware.js";

class CommentModel {
  constructor(userId, postId, content) {
    this.id = comment.length + 1;
    this.userId = userId;
    this.postId = postId;
    this.content = content;
    this.createdAt = new Date();
  }

  // Method to get all comments for a specific post
  static getAllCommentsForPost(postId) {
    const post = PostModel.getPostById(postId);
    if (!post) {
      throw new ApplicationError('Post not found', 404);
    }
    return comment.filter(c => c.postId === postId);
  }

  // Method to add a new comment to a specific post
  static addComment(userId, postId, content) {
    const post = PostModel.getPostById(postId);
    if (!post) {
      throw new ApplicationError('Post not found', 404);
    }
    const newComment = new CommentModel(userId, postId, content);
    comment.push(newComment);
    return newComment;
  }

  // Method to find a comment by its ID
  static findCommentById(commentId) {
    return comment.find(c => c.id === commentId);
  }

  // Method to update a specific comment by ID
  static updateCommentById(commentId, newContent) {
    const commentToUpdate = CommentModel.findCommentById(commentId);
    if (commentToUpdate) {
      commentToUpdate.content = newContent;
      return commentToUpdate;
    } else {
      throw new ApplicationError('Comment not found', 404);
    }
  }

  // Method to delete a specific comment by ID
  static deleteCommentById(commentId) {
    const index = comment.findIndex(c => c.id === commentId);
    if (index !== -1) {
      return comment.splice(index, 1)[0];
    } else {
      throw new ApplicationError('Comment not found', 404);
    }
  }

  // Get paginated comments for a post
  static getPaginatedComments(postId, page = 1, limit = 10) {
    const postComments = comment.filter(c => c.postId === postId);
    const start = (page - 1) * limit;
    const end = page * limit;
    return postComments.slice(start, end);
  }
}

// Initialize an empty comment array
let comment = [];

export default CommentModel;
