import LikeModel from "./like.model.js";

export class LikeController {
  toggleLike(req, res, next) {
    const { postId } = req.params;
    const userId = req.userId;
    try {
      const message = LikeModel.toggleLike(parseInt(postId), userId);
      return res.status(200).json({ message });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  isPostLiked(req, res, next) {
    const { postId } = req.params;
    const userId = req.userId;
    try {
      const isLiked = LikeModel.isPostLiked(parseInt(postId), userId);
      return res.status(200).json({ isLiked });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  getLikesForPost(req, res, next) {
    const { postId } = req.params;
    try {
      const allLikesOfPost = LikeModel.getLikesForPost(parseInt(postId));
      return res.status(200).json(allLikesOfPost);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  getLikesForUser(req, res, next) {
    const userId = req.userId;
    try {
      const allLikesOfUser = LikeModel.getLikesForUser(userId);
      return res.status(200).json(allLikesOfUser);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
}

export default LikeController;
