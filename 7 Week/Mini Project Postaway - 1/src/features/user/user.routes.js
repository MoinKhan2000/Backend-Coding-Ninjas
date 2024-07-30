import express from 'express';
import UserModel from './user.model.js';
import UserController from './user.controller.js';
let userCotnroller = new UserController()
const userRouter = express.Router()
userRouter.post('/sign-up', userCotnroller.signUp)    // done 
userRouter.post('/sign-in', userCotnroller.signIn)    // done
export default userRouter