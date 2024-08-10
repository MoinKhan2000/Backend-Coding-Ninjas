import { ApplicationErrorHandler } from "../../errorHandler/applicationErrorHandler.js";
import { UserModel } from "./user.schema.js";
const SECRET_KEY = process.env.SECRET_KEY || 'SECRET_KEY';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
export default class UserRepository {


  async signUp(user) {
    try {
      // create instance of model.
      console.log(user);

      const newUser = new UserModel(user)
      console.log(newUser);

      await newUser.save()
      return newUser
    } catch (error) {
      console.log(error);
      throw new ApplicationErrorHandler("Something went wrong - signup " + error, 500)
    }
  }

  async signIn(email, password) {
    try {
      // Find the user by email
      const user = await UserModel.findOne({ email });
      // If the user is not found
      if (!user) throw new Error('User not found');

      // Check if the password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error('Incorrect password');

      // Generate a JWT token if the credentials are correct
      const token = jwt.sign({ userId: user._id, email: user.email }, SECRET_KEY);

      // Push the new token to the tokens array
      user.tokens.push({ token });

      // Saving the user.
      await user.save();

      // Return the token and user 
      return { token, user };
    } catch (error) {
      throw new ApplicationErrorHandler("Something went wrong during sign-in ", 500)
    }
  }

  async logOut(id, token) {
    try {
      console.log(id, token);

      // Find the user by ID and remove the specific token from the tokens array
      const result = await UserModel.findByIdAndUpdate(id, {
        $pull: { tokens: { token } }
      }, { new: true });

      if (!result) {
        throw new ApplicationErrorHandler('User not found', 404);
      }

      return result;
    } catch (error) {
      throw new ApplicationErrorHandler('Could not logout', 500);
    }
  }

  async logOutFromAllDevices(id) {
    try {
      // Find the user by ID and set the tokens array to an empty array
      const result = await UserModel.findByIdAndUpdate(id, { $set: { tokens: [] } }, { new: true });

      // If the user is not found, throw an error
      if (!result) {
        throw new ApplicationErrorHandler('User not found', 404);
      }

      return result;
    } catch (error) {
      throw new ApplicationErrorHandler('Something went wrong during logout', 500);
    }
  }

  async findByEmail(email) {
    try {
      const user = await UserModel.findOne({ email })
      if (user) { return user }
      else throw new ApplicationErrorHandler('User not found', 404)
    } catch (error) {
      throw new ApplicationErrorHandler("Something went wrong - findByEmail " + error, 500)
    }
  }

  async changePassword(userId, newPassword) {
    try {
      let user = await UserModel.findById(userId)
      if (user) {
        user.password = newPassword
        console.log("user -> ", user);
        await user.save()
        return true
      } else {
        throw new ApplicationErrorHandler('User not found', 404)
      }
    } catch (error) {
      throw new ApplicationErrorHandler("Something went wrong - findByEmail " + error, 500)
    }
  }

  async updateDetails(userId, newDetails) {
    try {
      // Exclude the password field from the update if present
      const { password, ...updatedDetails } = newDetails;

      // Find the user by ID and update with new details, applying schema validation
      const user = await UserModel.findByIdAndUpdate(
        userId,
        { $set: { ...updatedDetails } },
        { new: true, runValidators: true }
      );

      // If the user is not found, throw an error
      if (!user) {
        throw new ApplicationErrorHandler('User not found', 404);
      }

      // Populate the user document while excluding the password field
      const response = await UserModel.populate(user, { path: '' }); // Using path: '' to include all fields except password

      response.password = undefined;

      return response;

    } catch (error) {
      console.error(error);

      // If the error is a Mongoose validation error, handle it accordingly
      if (error.name === 'ValidationError') {
        throw new ApplicationErrorHandler(`Validation Error: ${error.message}`, 400);
      }

      // For other types of errors, throw a generic error
      throw new ApplicationErrorHandler('Could not update user details', 500);
    }
  }

  async findUserById(userId) {
    try {
      console.log(userId);
      const result = await UserModel.findById(userId)
      if (!result) {
        throw new ApplicationErrorHandler('User not found', 404);
      }
      result.password = undefined
      result.tokens = undefined
      return result;
    } catch (error) {
      throw new ApplicationErrorHandler('Could not found', 500)
    }
  }

  async getAllUsers() {
    try {
      // Use projection to exclude fields like password and tokens
      const result = await UserModel.find({}, '-password -tokens');
      return result;
    } catch (error) {
      throw new ApplicationErrorHandler('Something went wrong', 500);
    }
  }
};
