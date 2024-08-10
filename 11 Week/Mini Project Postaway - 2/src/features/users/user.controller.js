import bcrypt from "bcrypt";
import { UserModel } from "./user.model.js";
import UserRepository from "./user.repository.js";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository()
  }

  async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const { token, user } = await this.userRepository.signIn(email, password);
      // Respond with the token and user information
      res.status(200).json({ token, user });
    } catch (error) {
      // Send appropriate error responses
      res.status(400).json({ error: error.message });
    }
  }

  async signUp(req, res) {
    try {
      let { name, email, password, gender } = req.body;
      let hashedPassword = await bcrypt.hash(password, 12)
      let user = new UserModel(name, email, hashedPassword, gender)
      let result = await this.userRepository.signUp(user)
      console.log(result);
      if (result) {
        res.status(201).send(result)
      } else {
        res.status(404).send('User could not be created')
      }
    } catch (error) {
      res.status(error.statusCode).send(error.message)
    }
  }
  async logout(req, res) {
    try {
      console.log('logging out');
      const userId = req.userId
      const token = req.token
      console.log(userId);
      let result = await this.userRepository.logOut(userId, token);
      if (result) {
        res.status(200).send('Logged out')
      } else {
        res.status(404).send('User could not be logged out')
      }
    } catch (error) {
      res.status(404).send('User could not be logged out')
    }
  }

  async logOutFromAllDevices(req, res) {
    try {
      const userId = req.userId
      let result = await this.userRepository.logOutFromAllDevices(userId)
      if (result) {
        res.status(200).send('Logged out from all devices')
      } else {
        res.status(404).send('User could not be logged out from all devices')
      }
    } catch (error) {
      res.status(500).send('Internal Server Error')
    }
  }

  async updateDetails(req, res) {
    try {
      // Extract userId from query parameters and newDetails from the request body
      const userId = req.params.userId;
      const newDetails = req.body;

      // Ensure userId is provided
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }

      // Call the repository method to update user details
      const result = await this.userRepository.updateDetails(userId, newDetails);

      // If update is successful, send the updated user details
      return res.status(200).json({ message: 'User details updated successfully', user: result });
    } catch (error) {
      // Log the error for debugging purposes
      console.error('Error updating user details:', error.message);

      // Handle specific error cases
      if (error.message.includes('Validation Error')) {
        return res.status(400).json({ message: error.message });
      } else if (error.message.includes('User not found')) {
        return res.status(404).json({ message: 'User not found' });
      }

      // For any other errors, return a generic server error message
      return res.status(500).json({ message: 'Something went wrong during update' });
    }
  }

  async getAllUsers(req, res) {
    const result = await this.userRepository.getAllUsers(req, res);
    res.status(200).json(result)
  }

  async getUserbyId(req, res) {
    let userId = req.params.userId
    try {
      const result = await this.userRepository.findUserById(userId)
      if (result) {
        res.status(200).send(result)
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }

  async resetPassword(req, res) {
    const { newPassword } = req.body;
    const userId = req.userId
    let hashedPassword = await bcrypt.hash(newPassword, 12)
    try {
      const result = await this.userRepository.changePassword(userId, hashedPassword)
      if (result) {
        res.status(200).send('Password changed')
      }
    } catch (error) {
      res.status(200).send('Something went wrong.')
    }
  }
}