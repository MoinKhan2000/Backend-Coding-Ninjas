import jwt from "jsonwebtoken";
import UserModel from "./user.model.js";
import { ApplicationError } from "../../middlewares/errorHandler.middleware.js";
const secretKey = 'SECRET_KEY';

class UserController {
  signIn(req, res) {
    const { email, password } = req.body;
    try {
      const user = UserModel.signIn(email, password);
      const token = jwt.sign(
        { userId: user.id, email: user.email, name: user.name },
        secretKey,
        { expiresIn: '1h' }
      );
      return res.status(200).json(token);
    } catch (error) {
      return res.status(error.code).send(error.message)
    }
  }

  signUp(req, res) {
    const { name, email, password } = req.body;
    try {
      const user = UserModel.signUp(name, email, password);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(error.code).send(error.message)
    }
  }

  getAllUsers(req, res) {
    try {
      const users = UserModel.getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(error.code).send(error.message)
    }
  }

  getUserById(req, res) {
    const { id } = req.params;
    try {
      const user = UserModel.getUserById(parseInt(id));
      return res.status(200).json(user);
    } catch (error) {
      return res.status(error.code).send(error.message)
    }
  }

  updateUser(req, res) {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
      const updatedUser = UserModel.updateUser(parseInt(id), name, email, password);
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(error.code).send(error.message)
    }
  }
}

export default UserController;
