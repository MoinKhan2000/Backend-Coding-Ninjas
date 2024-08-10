import { ApplicationErrorHandler } from "../../errorHandler/applicationErrorHandler.js";
import { LikeModel } from "./like.schema.js";
import { CommentModel } from "../comment/comment.schema.js";
import { PostModel } from "../posts/post.schema.js";

export default class LikeRepository {
  // Toggle like on a post
  async toggleLikePost(postId, userId) {
    try {
      const post = await PostModel.findById(postId);
      if (!post) {
        throw new ApplicationErrorHandler('Post not found', 404);
      }

      let like = await LikeModel.findOne({
        user: userId,
        likeable: postId,
        types: 'Post'
      });

      if (like) {
        // If a like already exists, remove it (toggle off)
        await LikeModel.findOneAndDelete({
          user: userId,
          likeable: postId,
          types: 'Post'
        });

        // Remove like from post's likes array
        await PostModel.findByIdAndUpdate(postId, {
          $pull: { likes: like._id }
        });

        return { message: 'Post like removed' };
      } else {
        // If no like exists, create it (toggle on)
        const newLike = new LikeModel({
          user: userId,
          likeable: postId,
          types: 'Post'
        });
        await newLike.save();

        // Add like to post's likes array
        await PostModel.findByIdAndUpdate(postId, {
          $push: { likes: newLike._id }
        });

        return { message: 'Post liked' };
      }
    } catch (error) {
      throw new ApplicationErrorHandler('Error toggling like on post', 500);
    }
  }

  // Toggle like on a comment
  async toggleLikeComment(commentId, userId) {
    try {
      const comment = await CommentModel.findById(commentId);
      if (!comment) {
        throw new ApplicationErrorHandler('Comment not found', 404);
      }

      let like = await LikeModel.findOne({
        user: userId,
        likeable: commentId,
        types: 'Comment'
      });

      if (like) {
        // If a like already exists, remove it (toggle off)
        await LikeModel.findOneAndDelete({
          user: userId,
          likeable: commentId,
          types: 'Comment'
        });

        // Remove like from comment's likes array
        await CommentModel.findByIdAndUpdate(commentId, {
          $pull: { likes: like._id }
        });

        return { message: 'Comment like removed' };
      } else {
        // If no like exists, create it (toggle on)
        const newLike = new LikeModel({
          user: userId,
          likeable: commentId,
          types: 'Comment'
        });
        await newLike.save();

        // Add like to comment's likes array
        await CommentModel.findByIdAndUpdate(commentId, {
          $push: { likes: newLike._id }
        });

        return { message: 'Comment liked' };
      }
    } catch (error) {
      throw new ApplicationErrorHandler('Error toggling like on comment', 500);
    }
  }

  // Get likes of a post
  async getLikesOfPost(postId) {
    try {
      const post = await PostModel.findById(postId);
      if (!post) {
        throw new ApplicationErrorHandler('Post not found', 404);
      }

      const likes = await LikeModel.find({ likeable: postId, types: 'Post' }).populate('user', 'name email');
      return likes;
    } catch (error) {
      throw new ApplicationErrorHandler('Error retrieving likes for post', 500);
    }
  }

  // Get likes of a comment
  async getLikesOfComment(commentId) {
    try {
      const comment = await CommentModel.findById(commentId);
      if (!comment) {
        throw new ApplicationErrorHandler('Comment not found', 404);
      }

      const likes = await LikeModel.find({ likeable: commentId, types: 'Comment' }).populate('user', 'name email');
      return likes;
    } catch (error) {
      throw new ApplicationErrorHandler('Error retrieving likes for comment', 500);
    }
  }
}
