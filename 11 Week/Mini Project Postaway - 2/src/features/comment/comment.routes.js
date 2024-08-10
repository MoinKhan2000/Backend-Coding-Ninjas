import express from "express"
import CommentController from "./comment.controller.js"
const commentRouter = express.Router()
const commentController = new CommentController()

commentRouter.get('/:postId', (req, res) => { commentController.getCommentOfPost(req, res) })

commentRouter.post('/:postId', (req, res) => { commentController.createComment(req, res) })

commentRouter.put('/:commentId', (req, res) => { commentController.updateComment(req, res) })

commentRouter.delete('/:commentId', (req, res) => { commentController.deleteComment(req, res) })

export default commentRouter