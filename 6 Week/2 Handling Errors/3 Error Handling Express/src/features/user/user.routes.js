
import express from 'express'
const userRouter = express.Router()
import UserController from './user.controller.js'

let userCotnroller = new UserController()
userRouter.get('/', userCotnroller.getAllUsers)
userRouter.get('/:id', userCotnroller.getUserbyId)
userRouter.post('/signup', userCotnroller.signUp)
userRouter.post('/signin', userCotnroller.signIn)

export default userRouter