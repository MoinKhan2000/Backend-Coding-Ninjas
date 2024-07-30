import UserModel from "../user/user.model.js";
import { ApplicationError } from "../../middlewares/errorHandler.middleware.js";

class PostModel {
  constructor(userId, caption, imageUrl, isDraft = false, isArchived = false) {
    this.id = posts.length + 1;
    this.userId = userId;
    this.caption = caption;
    this.imageUrl = imageUrl;
    this.likes = [];
    this.createdAt = new Date();
    this.isDraft = isDraft;
    this.isArchived = isArchived;
  }

  // Get all posts
  static getAllPosts() {
    return posts;
  }

  // Get a specific post by ID
  static getPostById(id) {
    const post = posts.find((p) => p.id == id);
    if (post) {
      return post;
    }
    throw new ApplicationError(`Post with id ${id} not found getPostbyid`, 404); // 404 Not Found
  }


  // Get all posts by a specific user
  static getPostsByUser(userId) {
    const availablePosts = posts.filter((p) => p.userId == userId);
    if (availablePosts.length > 0) {
      return availablePosts;
    }
    throw new ApplicationError(`User's posts with id ${userId} not found`, 404); // 404 Not Found
  }

  // Create a new post
  static createPost(userId, caption, imageUrl) {
    // Check if the user exists
    UserModel.getUserById(userId); // Ensure user exists
    const newPost = new PostModel(userId, caption, imageUrl);
    posts.push(newPost);
    return newPost;
  }

  // Delete a post by ID
  static deletePost(id, userId) {
    const postIndex = posts.findIndex((post) => post.id == id && post.userId == userId);
    if (postIndex === -1) {
      throw new ApplicationError(`Invalid credentials or post not found`, 404);
    }
    posts.splice(postIndex, 1);
    return 'Deleted the post successfully';
  }

  // Update a specific post by ID
  static updatePost(id, userId, caption, imageUrl) {
    const postIndex = posts.findIndex((post) => post.id == id && post.userId == userId);
    if (postIndex === -1) {
      throw new ApplicationError(`Invalid credentials or post not found`, 404);
    }
    if (caption) posts[postIndex].caption = caption;
    if (imageUrl) posts[postIndex].imageUrl = imageUrl;
    console.log(posts[postIndex]);
    return 'Updated the post successfully.';
  }

  // Filter posts by caption
  static filterPostsByCaption(caption) {
    console.log('hii');

    return posts.filter(post => post.caption.toLowerCase().includes(caption.toLowerCase()));
  }

  // Save a post as a draft
  static saveDraft(userId, caption, imageUrl) {
    const newPost = new PostModel(userId, caption, imageUrl, true);
    posts.push(newPost);
    return newPost;
  }

  // Archive a post by ID
  static archivePost(id, userId) {
    const post = posts.find(p => p.id == id);
    console.log(id, userId, post);

    if (!post) {
      throw new ApplicationError(`Invalid credentials or post not found`, 404);
    }
    post.isArchived = !post.isArchived;

    if (post.isArchived) return 'Post archived successfully'
    else 'Post removed from archived successfully'
  }

  static sortPosts(sortBy = 'date') {
    if (sortBy === 'likes') {
      return posts.sort((a, b) => b.likes.length - a.likes.length || b.createdAt - a.createdAt);
    } else if (sortBy === 'date') {
      return posts.sort((a, b) => b.createdAt - a.createdAt);
    }
    else {
      throw new ApplicationError('Invalid sort criteria: ' + sortBy, 400);
    }
  }

  // Get all posts with pagination
  static getPaginatedPosts(page = 1, limit = 10) {
    const start = (page - 1) * limit;
    const end = page * limit;
    return posts.slice(start, end);
  }

  // Like a post

  // Like a post
  static likePost(postId, userId) {
    const post = posts.find((p) => p.id == postId);
    if (!post) {
      throw new ApplicationError(`Post with id ${postId} not found`, 404); // 404 Not Found
    }

    const userIndex = post.likes.indexOf(userId);
    if (userIndex === -1) {
      post.likes.push(userId); // Like the post
      return 'Post liked successfully.';
    } else {
      post.likes.splice(userIndex, 1); // Unlike the post
      return 'Post unliked successfully.';
    }
  }


}

let posts = [
  { id: 1, userId: 1, caption: 'full stack developer', imageUrl: 'http://asdfa.jpgg', likes: [], createdAt: new Date() }
  // new PostModel(1, 'Full Stack Developer', 'http://campusmonk.img')
];

export default PostModel;
