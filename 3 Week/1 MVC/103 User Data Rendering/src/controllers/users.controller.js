// src/controllers/users.controller.js
import { userModel } from '../models/users.model.js';

export const userController = async (req, res) => {
  try {
    const users = await userModel();
    console.log(users);
    res.render('index', { users: users.users });
  } catch (error) {
    res.status(500).send('Error rendering users view');
  }
};

