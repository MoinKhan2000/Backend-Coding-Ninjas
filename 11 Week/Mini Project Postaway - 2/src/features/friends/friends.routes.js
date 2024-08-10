import express from "express"
import FriendsController from "./friends.controller.js"

const friendRouter = express.Router()
const friendsController = new FriendsController()

friendRouter.get('/get-friend/:userId', (req, res) => { friendsController.getFriends(req, res) })

friendRouter.get('/get-pending-requests', (req, res) => { friendsController.getPendingRequests(req, res) })

friendRouter.post('/toggle-friendship/:friendId', (req, res) => { friendsController.toggleFriendship(req, res) })

friendRouter.post('/response-to-request/:friendId', (req, res) => { friendsController.respondToRequest(req, res) })

export default friendRouter
