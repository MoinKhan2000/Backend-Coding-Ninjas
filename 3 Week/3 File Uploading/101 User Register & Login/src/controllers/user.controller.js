// Please don't change the pre-written code
// Import the necessary modules here

import { authenticateUser, registerUser } from "../models/user.model";

export default class UserController {
  getRegister = (req, res, next) => {
    return res.render('user-register');
  };
  getLogin = (req, res, next) => {
    return res.render('user-login');
  };
  addUser = (req, res) => {
    const user = registerUser(req.body)
    if (user) {
      return res.render('user-login');
    }
  };
  loginUser = (req, res) => {
    const user = authenticateUser(req.body)
    if (user) {
      res.send({ success: "true", message: "login successful" })
    } else {
      res.send({ success: "false", message: "login failed" })
    }
  };
}
