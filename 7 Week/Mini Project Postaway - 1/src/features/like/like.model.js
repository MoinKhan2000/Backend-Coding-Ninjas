import PostModel from "../post/post.model.js";

class LikeModel {
  constructor(postId, userId) {
    this.id = likes.length + 1;
    this.postId = postId;
    this.userId = userId;
    this.createdAt = new Date();
  }

  static toggleLike(postId, userId) {
    let isPostPresent = PostModel.getPostById(postId);
    if (isPostPresent) {
      let likeIndex = likes.findIndex(l => l.postId === postId && l.userId === userId);
      if (likeIndex !== -1) {
        likes.splice(likeIndex, 1);
        return `You have unliked the post successfully`;
      } else {
        let newLike = new LikeModel(postId, userId);
        likes.push(newLike);
        return `You have liked the post successfully`;
      }
    } else {
      throw new Error('Post not found');
    }
  }

  static isPostLiked(postId, userId) {
    return likes.some(l => l.postId === postId && l.userId === userId);
  }

  static getLikesForPost(postId) {
    return likes.filter(l => l.postId === postId);
  }

  static getLikesForUser(userId) {
    return likes.filter(l => l.userId === userId);
  }
}

let likes = [];

export default LikeModel;
