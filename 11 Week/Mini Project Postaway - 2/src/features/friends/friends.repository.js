import { ApplicationErrorHandler } from '../../errorHandler/applicationErrorHandler.js';
import { UserModel } from '../users/user.schema.js';

export default class FriendRepository {
  // Get a user's friends
  async getFriends(userId) {
    try {
      // Find the user by ID
      let user = await UserModel.findById(userId).populate('friends.friendId', 'name email');

      // If the user is not found, throw an error
      if (!user) {
        throw new ApplicationErrorHandler('User not found', 404);
      }

      // If the user has no friends, return an empty array
      if (!user.friends || user.friends.length === 0) {
        return [];
      }

      // Return the populated friends array
      return user.friends.map(friend => ({
        _id: friend.friendId._id,
        name: friend.friendId.name,
        email: friend.friendId.email,
        status: friend.status
      }));

    } catch (error) {
      throw new ApplicationErrorHandler(error.message || 'Error retrieving friends', error.statusCode || 500);
    }
  }


  // Get pending friend requests
  async getPendingRequests(userId) {
    try {
      const user = await UserModel.findById(userId).populate('friendRequests.requestId', 'name email');
      if (!user) {
        throw new ApplicationErrorHandler('User not found', 404);
      }
      return user.friendRequests.filter(req => req.status === 'pending');
    } catch (error) {
      throw new ApplicationErrorHandler('Error retrieving pending requests', 500);
    }
  }

  // Toggle friendship
  async toggleFriendship(userId, friendId) {
    try {
      const user = await UserModel.findById(userId);
      const friend = await UserModel.findById(friendId);

      if (!user || !friend) {
        throw new ApplicationErrorHandler('User or friend not found', 404);
      }

      // Check if the user is already friends
      const existingFriend = user.friends.find(f => f.friendId.toString() === friendId);
      if (existingFriend) {
        // Remove friendship
        user.friends = user.friends.filter(f => f.friendId.toString() !== friendId);
        friend.friends = friend.friends.filter(f => f.friendId.toString() !== userId);
      } else {
        // Add friendship
        user.friends.push({ friendId, status: 'accepted' });
        friend.friends.push({ friendId: userId, status: 'accepted' });
      }

      await user.save();
      await friend.save();
      return { message: 'Friendship toggled' };
    } catch (error) {
      throw new ApplicationErrorHandler('Error toggling friendship', 500);
    }
  }

  // Respond to a friend request
  async respondToRequest(userId, friendId, response) {
    try {
      if (response !== 'accepted' && response !== 'rejected') {
        throw new ApplicationErrorHandler('Invalid response', 400);
      }

      const user = await UserModel.findById(userId);
      const friend = await UserModel.findById(friendId);

      if (!user || !friend) {
        throw new ApplicationErrorHandler('User or friend not found', 404);
      }

      // Find and update the friend request
      const request = user.friendRequests.find(req => req.requestId.toString() === friendId);
      if (!request) {
        throw new ApplicationErrorHandler('Friend request not found', 404);
      }

      request.status = response;
      await user.save();

      if (response === 'accepted') {
        // Add to friends if accepted
        user.friends.push({ friendId, status: 'accepted' });
        friend.friends.push({ friendId: userId, status: 'accepted' });
        await friend.save();
      }

      return { message: 'Friend request response recorded' };
    } catch (error) {
      throw new ApplicationErrorHandler('Error responding to friend request', 500);
    }
  }
}
