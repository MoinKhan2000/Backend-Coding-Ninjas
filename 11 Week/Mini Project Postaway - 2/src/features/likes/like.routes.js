import express from 'express';
import LikeController from './like.controller.js';
const likeRouter = express.Router()
const likeController = new LikeController()

likeRouter.post('/:id', (req, res) => {
  likeController.toggleLike(req, res)
})
likeRouter.get('/:id', (req, res) => {
  likeController.getLikes(req, res)
})

export default likeRouter