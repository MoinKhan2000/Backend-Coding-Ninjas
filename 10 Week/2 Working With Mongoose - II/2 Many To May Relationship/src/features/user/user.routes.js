
import express from 'express'
const userRouter = express.Router()
import UserController from './user.controller.js'
import { jwtAuth } from '../../middlewares/jwtAuth.middleware.js'

let userCotnroller = new UserController()
userRouter.get('/', userCotnroller.getAllUsers)
userRouter.get('/:id', userCotnroller.getUserbyId)
userRouter.post('/signup', (req, res) => { userCotnroller.signUp(req, res) })
userRouter.post('/signin', (req, res) => { userCotnroller.signIn(req, res) })
userRouter.put('/changepassword', jwtAuth, (req, res) => { userCotnroller.resetPassword(req, res) })

export default userRouter