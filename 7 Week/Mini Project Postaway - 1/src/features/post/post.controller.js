import { ApplicationError } from "../../middlewares/errorHandler.middleware.js";
import PostModel from "./post.model.js";

class PostController {
  getAllPosts(req, res, next) {
    try {
      const posts = PostModel.getAllPosts();
      return res.status(200).json(posts);
    } catch (error) {
      return res.status(error.code).send(error.message);
    }
  }

  getPostById(req, res, next) {
    const { id } = req.params;
    try {
      const post = PostModel.getPostById(parseInt(id));
      return res.status(200).json(post);
    } catch (error) {
      return res.status(error.code).send(error.message);
    }
  }

  getPostsByUser(req, res, next) {
    const userId = req.userId;
    try {
      const posts = PostModel.getPostsByUser(parseInt(userId));
      return res.status(200).json(posts);
    } catch (error) {
      return res.status(error.code).send(error.message);
    }
  }

  createPost(req, res, next) {
    const { caption } = req.body;
    const imageUrl = req.file.filename;
    const userId = req.userId;
    try {
      const post = PostModel.createPost(userId, caption, imageUrl);
      return res.status(201).json(post);
    } catch (error) {
      return res.status(error.code).send(error.message);
    }
  }

  deletePost(req, res, next) {
    const { id } = req.params;
    const userId = req.userId;
    try {
      const message = PostModel.deletePost(parseInt(id), userId);
      return res.status(204).send(message);
    } catch (error) {
      return res.status(error.code).send(error.message);
    }
  }

  updatePost(req, res, next) {
    const { id } = req.params;
    const { caption } = req.body;
    const imageUrl = req.file ? req.file.filename : '';
    const userId = req.userId;
    try {
      const message = PostModel.updatePost(parseInt(id), userId, caption, imageUrl);
      return res.status(200).json({ message });
    } catch (error) {
      return res.status(error.code).send(error.message);
    }
  }

  filterPostsByCaption(req, res, next) {
    const { caption } = req.query;
    console.log('caption -> ', caption);

    try {
      const posts = PostModel.filterPostsByCaption(caption);
      return res.status(200).json(posts);
    } catch (error) {
      return res.status(error.code).send(error.message);
    }
  }

  saveDraft(req, res, next) {
    const { caption } = req.body;
    const imageUrl = req.file.filename;
    const userId = req.userId;
    try {
      const post = PostModel.saveDraft(userId, caption, imageUrl);
      return res.status(201).json(post);
    } catch (error) {
      return res.status(error.code).send(error.message);
    }
  }

  archivePost(req, res, next) {
    const { id } = req.params;
    const userId = req.userId;
    console.log(id, userId);

    try {
      const message = PostModel.archivePost(parseInt(id), userId);
      return res.status(200).json({ message });
    } catch (error) {
      return res.status(error.code).send(error.message);
    }
  }

  sortPosts(req, res, next) {
    const { sortBy } = req.query;
    try {
      const posts = PostModel.sortPosts(sortBy);
      return res.status(200).json(posts);
    } catch (error) {
      return res.status(error.code).send(error.message);
    }
  }

  getPaginatedPosts(req, res, next) {
    const { page, limit } = req.query;
    console.log(page, limit);

    try {
      const posts = PostModel.getPaginatedPosts(parseInt(page), parseInt(limit));
      return res.status(200).json(posts);
    } catch (error) {
      return res.status(error.code).send(error.message);
    }
  }

  likePost(req, res, next) {
    const { postId } = req.params;
    const userId = req.userId;
    try {
      const message = PostModel.likePost(parseInt(postId), userId);
      return res.status(200).json({ message });
    } catch (error) {
      return res.status(error.code).send(error.message);
    }
  }
}

export default PostController;
