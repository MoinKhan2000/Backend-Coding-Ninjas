import mongoose, { Schema } from "mongoose";
import { userSchema } from "./user.schema.js";
import { ApplicationError } from "../../errorHandler/applicatioonError.js";
const UserModel = mongoose.model('User', userSchema)

// Creating model for schema.
export default class UserRepository {
  async signUp(user) {
    try {
      // create instance of model.
      const newUser = new UserModel(user)
      await newUser.save()
      return newUser
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong - signup " + error, 500)
    }
  }

  async signIn(email, password) {
    try {
      const user = await UserModel.findOne({ email })
      if (!user) throw new ApplicationError('User not found', 404);
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) throw new ApplicationError('Invalid credentials', 401);
      return user
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong - signin  " + error, 500)
    }
  }

  async findByEmail(email) {
    try {
      const user = await UserModel.findOne({ email })
      if (user) { return user }
      else throw new ApplicationError('User not found', 404)
    } catch (error) {
      throw new ApplicationError("Something went wrong - findByEmail " + error, 500)
    }
  }
}