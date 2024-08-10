import express from "express"
import UserController from "./user.controller.js"
import jwtAuth from "../../middlewares/jwtAuth.middleware.js"
const userRouter = express.Router()
let userController = new UserController()

userRouter.post('/signup', (req, res) => { userController.signUp(req, res) })
userRouter.post('/signin', (req, res) => { userController.signIn(req, res) })

userRouter.get('/logout', jwtAuth, (req, res) => { userController.logout(req, res) })

userRouter.get('/logout-all-devices', jwtAuth, (req, res) => { userController.logOutFromAllDevices(req, res) })

userRouter.post('/update-details/:userId', (req, res) => { userController.updateDetails(req, res) })

userRouter.get('/get-details/:userId', (req, res) => { userController.getUserbyId(req, res) })

userRouter.get('/get-all-details', (req, res) => { userController.getAllUsers(req, res) })

export default userRouter