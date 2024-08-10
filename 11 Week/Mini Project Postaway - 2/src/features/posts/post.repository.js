import { ApplicationErrorHandler } from "../../errorHandler/applicationErrorHandler.js";
import { PostModel } from "./post.schema.js";

export default class PostRepository {

  // Utility function to find and populate a post
  async findAndPopulatePost(query) {
    try {
      const post = await PostModel.findOne(query)
        .populate('createdBy', 'name email')
        .populate({
          path: 'comments',
          populate: {
            path: 'createdBy',
            select: 'name email'
          }
        })
        .populate({
          path: 'likes',
          populate: {
            path: 'user',
            select: 'name email'
          }
        });

      if (!post) {
        throw new ApplicationErrorHandler('Post not found', 404);
      }
      return post;
    } catch (error) {
      throw new ApplicationErrorHandler('Error finding and populating post', 500);
    }
  }

  // Create a new post
  async createPost(caption, imageUrl, userId) {
    try {
      const newPost = new PostModel({
        caption,
        imageUrl,
        createdBy: userId
      });
      return await newPost.save(); // Mongoose validates and saves the post
    } catch (error) {
      throw new ApplicationErrorHandler('Could not create post', 500);
    }
  }

  // Get a post by ID
  async getPostOfId(postId) {
    try {
      return await this.findAndPopulatePost({ _id: postId });
    } catch (error) {
      throw new ApplicationErrorHandler('Error retrieving post', 500);
    }
  }

  // Get all posts
  async getAllPosts() {
    try {
      const posts = await PostModel.find();

      if (posts.length === 0) {
        throw new ApplicationErrorHandler('No posts found', 404);
      }

      // Populate the 'createdBy' and 'comments' fields for all posts
      return await PostModel.populate(posts, [
        { path: 'createdBy', select: 'name email' },
        {
          path: 'comments',
          populate: { path: 'createdBy', select: 'name email' },
        },
        {
          path: 'likes',
          populate: { path: 'user', select: 'name email' }
        }
      ]);
    } catch (error) {
      throw new ApplicationErrorHandler('Could not retrieve posts', 500);
    }
  }

  // Get all posts of a specific user
  async getAllPostsOfUser(userId) {
    try {
      const posts = await PostModel.find({ createdBy: userId })
        .populate('createdBy', 'name email')
        .populate({
          path: 'comments',
          populate: {
            path: 'createdBy',
            select: 'name email'
          }
        })
        .populate({
          path: 'likes',
          populate: {
            path: 'user',
            select: 'name email'
          }
        });

      if (posts.length === 0) {
        throw new ApplicationErrorHandler('No posts found for this user', 404);
      }
      return posts;
    } catch (error) {
      throw new ApplicationErrorHandler('Error retrieving user posts', 500);
    }
  }

  // Delete a post by ID
  async deletePost(postId, userId) {
    try {
      const post = await this.findAndPopulatePost({ _id: postId });

      if (post.createdBy._id.toString() !== userId.toString()) {
        throw new ApplicationErrorHandler('Not authorized to delete this post', 403);
      }

      await PostModel.findByIdAndDelete(postId);
      return { message: 'Post deleted successfully' };
    } catch (error) {
      throw new ApplicationErrorHandler('Could not delete post', 500);
    }
  }

  // Update a post by ID
  async updatePost(postId, userId, postData) {
    try {
      // Use findOneAndUpdate to update the post with validation
      const updatedPost = await PostModel.findOneAndUpdate(
        { _id: postId, createdBy: userId },
        { $set: { ...postData } },
        { new: true, runValidators: true }
      )
        .populate('createdBy', 'name email')
        .populate({
          path: 'comments',
          populate: {
            path: 'createdBy',
            select: 'name email'
          }
        })
        .populate({
          path: 'likes',
          populate: {
            path: 'user',
            select: 'name email'
          }
        });

      if (!updatedPost) {
        // Check if the post was found and if the user is authorized
        throw new ApplicationErrorHandler('Post not found or not authorized', 404);
      }

      return updatedPost;
    } catch (error) {
      // Handle the error, providing a specific message and status code
      throw new ApplicationErrorHandler(error.message || 'Could not update post', error.statusCode || 500);
    }
  }
}
