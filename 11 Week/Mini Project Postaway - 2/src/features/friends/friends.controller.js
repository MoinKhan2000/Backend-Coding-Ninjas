import FriendsRepository from './friends.repository.js';

export default class FriendsController {
  constructor() {
    this.friendRepository = new FriendsRepository();
  }

  // Get a user's friends
  async getFriends(req, res) {
    console.log('getFriends');
    try {
      const userId = req.params.userId;
      const friends = await this.friendRepository.getFriends(userId);
      console.log(friends);
      res.status(200).json(friends);
    } catch (error) {
      res.status(error.statusCode || 500).send(error.message || 'Error retrieving friends');
    }
  }

  // Get pending friend requests
  async getPendingRequests(req, res) {
    try {
      const userId = req.userId;
      const pendingRequests = await this.friendRepository.getPendingRequests(userId);
      res.status(200).json(pendingRequests);
    } catch (error) {
      res.status(error.statusCode || 500).send(error.message || 'Error retrieving pending requests');
    }
  }

  // Toggle friendship with another user
  async toggleFriendship(req, res) {
    try {
      const userId = req.userId;
      const friendId = req.params.friendId;
      const result = await this.friendRepository.toggleFriendship(userId, friendId);
      res.status(200).json(result);
    } catch (error) {
      res.status(error.statusCode || 500).send(error.message || 'Error toggling friendship');
    }
  }

  // Accept or reject a friend request
  async respondToRequest(req, res) {
    try {
      const userId = req.userId;
      const friendId = req.params.friendId;
      const { response } = req.body; // 'accepted' or 'rejected'
      const result = await this.friendRepository.respondToRequest(userId, friendId, response);
      res.status(200).json(result);
    } catch (error) {
      res.status(error.statusCode || 500).send(error.message || 'Error responding to friend request');
    }
  }
}
