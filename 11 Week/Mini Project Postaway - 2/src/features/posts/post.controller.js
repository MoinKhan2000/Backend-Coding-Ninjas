import PostRepository from "./post.repository.js";

export default class PostController {
  constructor() {
    this.postRepository = new PostRepository();
  }

  // Create a new post
  async createPost(req, res) {
    try {
      const { caption } = req.body;
      const imageUrl = req?.file?.filename
      console.log(caption, imageUrl);

      const userId = req.userId;
      const newPost = await this.postRepository.createPost(caption, imageUrl, userId);
      res.status(201).json(newPost);
    } catch (error) {
      res.status(error.code || 500).json({ error: error.message || 'Could not create post' });
    }
  }

  // Get a post by ID
  async getPostOfId(req, res) {
    try {
      const { postId } = req.params;
      const post = await this.postRepository.getPostOfId(postId);
      res.status(200).json(post);
    } catch (error) {
      res.status(error.code || 500).json({ error: error.message || 'Error retrieving post' });
    }
  }

  // Get all posts
  async getAllPosts(req, res) {
    try {
      const posts = await this.postRepository.getAllPosts();
      res.status(200).json(posts);
    } catch (error) {
      res.status(error.code || 500).json({ error: error.message || 'Could not retrieve posts' });
    }
  }

  // Get all posts of a specific user
  async getAllPostsOfUser(req, res) {
    try {
      const { userId } = req.params;
      const posts = await this.postRepository.getAllPostsOfUser(userId);
      res.status(200).json(posts);
    } catch (error) {
      res.status(error.code || 500).json({ error: error.message || 'Error retrieving user posts' });
    }
  }

  // Delete a post by ID
  async deletePost(req, res) {
    try {
      const { postId } = req.params;
      const userId = req.userId;
      const result = await this.postRepository.deletePost(postId, userId);
      res.status(200).json(result);
    } catch (error) {
      res.status(error.code || 500).json({ error: error.message || 'Could not delete post' });
    }
  }

  // Update a post by ID
  async updatePost(req, res) {
    try {
      const { postId } = req.params;
      const { caption } = req.body;
      const imageUrl = req.file ? req.file.filename : undefined; // Use undefined if no file is provided
      const userId = req.userId;
      console.log(caption, imageUrl);


      // Prepare the update data, including imageUrl only if it's defined
      const postData = {
        ...(caption && { caption }), // Include caption if provided
        ...(imageUrl && { imageUrl }) // Include imageUrl if it's defined
      };

      // Update the post using the repository method
      const updatedPost = await this.postRepository.updatePost(postId, userId, postData);

      // Respond with the updated post
      res.status(200).json(updatedPost);
    } catch (error) {
      // Handle errors by responding with the error message and status code
      res.status(error.statusCode || 500).json({ error: error.message || 'Could not update post' });
    }
  }

}
