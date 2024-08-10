import { CommentModel } from "./comment.schema.js";
import { PostModel } from "../posts/post.schema.js";
import { ApplicationErrorHandler } from "../../errorHandler/applicationErrorHandler.js";

export class CommentRepository {

  // Get all comments
  async getAllComments() {
    const comments = await CommentModel.find()
      .populate('createdBy', 'name email')
      .populate('postId', 'caption imageUrl')
      .exec();
    return comments;
  }

  // Get all comments of a specific post
  async getCommentOfPost(postId) {
    const comments = await CommentModel.find({ postId })
      .populate('createdBy', 'name email')
      .exec();
    if (!comments) {
      throw new ApplicationErrorHandler('No comments found for this post', 404);
    }
    return comments;
  }

  // Create a new comment
  async createComment(postId, userId, content) {
    // Check if the post exists
    const post = await PostModel.findById(postId);
    if (!post) {
      throw new ApplicationErrorHandler('Post not found', 404);
    }

    // Create and save the comment
    const newComment = new CommentModel({
      content,
      createdBy: userId,
      postId,
    });

    // Push the new comment's _id to the post's comments array
    post.comments.push(newComment._id);
    await post.save();

    await newComment.save();
    return newComment;
  }

  // Update an existing comment
  async updateComment(commentId, userId, content) {
    // Find the comment
    const comment = await CommentModel.findOneAndUpdate(
      { _id: commentId, createdBy: userId },
      { $set: { content } },
      { new: true, runValidators: true }
    );

    if (!comment) {
      throw new ApplicationErrorHandler('Comment not found or not authorized', 404);
    }

    return comment;
  }

  // Delete a comment
  async deleteComment(commentId, userId) {
    // Find and delete the comment
    const deletedComment = await CommentModel.findOneAndDelete({
      _id: commentId,
      createdBy: userId,
    });

    // Check if the comment was deleted
    if (!deletedComment) {
      throw new ApplicationErrorHandler('Comment not found', 404);
    }

    // Extract the postId from the deleted comment
    const postId = deletedComment.postId;

    // Find the post and remove the comment ID from the comments array
    await PostModel.findByIdAndUpdate(postId, {
      $pull: { comments: commentId }
    });

    return deletedComment;
  }
}
