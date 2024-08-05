import express from 'express';
import { LikeController } from './like.controller.js';
const likeRouter = express.Router()

const likeController = new LikeController()

likeRouter.post('/', (req, re, next) => {
  likeController.likeItem(req, re, next)
})
likeRouter.get('/', (req, re, next) => {
  likeController.getLikes(req, re, next)
})

export default likeRouter