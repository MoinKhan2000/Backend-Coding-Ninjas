import express from 'express';
import PostController from './post.controller.js';
import { upload } from '../../middlewares/fileHandler.middleware.js';
import loggerMiddleware from '../../middlewares/loggerHandler.middleware.js';

const postRoutes = express.Router();
const postController = new PostController();

postRoutes.use(loggerMiddleware);

// Specific routes first
postRoutes.get('/filter', postController.filterPostsByCaption); // Filter posts by caption    // done
postRoutes.get('/sort', postController.sortPosts); // Sort posts    // done 
postRoutes.get('/paginate', postController.getPaginatedPosts); // Get paginated posts   // done
postRoutes.post('/draft', upload.single('imageUrl'), postController.saveDraft); // Save post as draft     // done
postRoutes.put('/archive/:id', postController.archivePost); // Archive a post   // done
postRoutes.put('/like/:postId', postController.likePost); // Like a post    // done

// General routes
postRoutes.get('/all', postController.getAllPosts); // Get all posts // done
postRoutes.get('/:id', postController.getPostById); // Get post by ID // done
postRoutes.get('/', postController.getPostsByUser); // Get posts by user  // done
postRoutes.post('/', upload.single('imageUrl'), postController.createPost); // Create a post  // done
postRoutes.delete('/:id', postController.deletePost); // Delete a post    // done
postRoutes.put('/:id', upload.single('imageUrl'), postController.updatePost); // Update a post    // done

export default postRoutes;
