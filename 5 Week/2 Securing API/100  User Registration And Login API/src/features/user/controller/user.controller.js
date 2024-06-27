// Please don't change the pre-written code
// Import the necessary modules here

import { addUser, confirmLogin } from "../model/user.model.js";

export const registerUser = (req, res, next) => {
  let newUser = addUser(req.body)
  if (newUser) {
    return res.status(201).json({ "status": "success", "user": newUser })
  }
  return res.status(403).send('User already registered')
};

export const loginUser = (req, res) => {
  let result = confirmLogin(req.body)
  if (result) {
    return res.status(200).json({ "status": "success", "msg": "login successfull" })
  }
  return res.status(400).json({ "status": "failure", "msg": "Invalid user details" })
};
