import LikeRepository from "./like.repository.js";

export default class LikeController {
  constructor() {
    this.likeRepository = new LikeRepository();
  }

  // Toggle like on post or comment
  async toggleLike(req, res) {
    console.log('toggleLike');

    const userId = req.userId;
    const id = req.params.id;
    const { type } = req.body;

    if (type !== 'Post' && type !== 'Comment') {
      return res.status(400).send('Invalid type');
    }

    try {
      let result;
      if (type === 'Post') {
        result = await this.likeRepository.toggleLikePost(id, userId);
      } else if (type === 'Comment') {
        result = await this.likeRepository.toggleLikeComment(id, userId);
      }

      res.status(200).send(result.message);
    } catch (error) {
      res.status(500).send('Error toggling like');
    }
  }

  // Get likes for post or comment
  async getLikes(req, res) {
    const id = req.params.id;
    const { type } = req.body;

    if (type !== 'Post' && type !== 'Comment') {
      return res.status(400).send('Invalid type');
    }

    try {
      let result;
      if (type === 'Post') {
        result = await this.likeRepository.getLikesOfPost(id);
      } else if (type === 'Comment') {
        result = await this.likeRepository.getLikesOfComment(id);
      }

      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(404).send('No likes found');
      }
    } catch (error) {
      res.status(500).send('Error retrieving likes');
    }
  }
}
