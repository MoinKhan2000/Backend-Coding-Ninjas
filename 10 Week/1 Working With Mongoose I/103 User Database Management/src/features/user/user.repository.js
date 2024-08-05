// Please don't change the pre-written code
// Import the necessary modules here

import bcrypt from "bcrypt";
import { customErrorHandler } from "../../middlewares/errorHandler";
import { userSchema } from "./user.schema";
import mongoose from "mongoose";
const User = mongoose.model('User', userSchema);

export const userRegisterationRepo = async (userData) => {
  try {
    const newUser = new User(userData);
    const savedUser = await newUser.save();
    return {
      success: true,
      res: savedUser
    };
  } catch (error) {
    let errorMsg = 'Error saving user';
    let statusCode = 500;

    if (error.name === 'ValidationError') {
      errorMsg = Object.values(error.errors).map(e => e.message).join(', ');
      statusCode = 400;
    } else if (error.code === 11000) {
      errorMsg = 'Email or mobile number already exists';
      statusCode = 400;
    }

    return {
      success: false,
      error: {
        statusCode,
        msg: errorMsg
      }
    };
  }
};

export const userLoginRepo = async (userData) => {
  try {
    const { email, password } = userData;
    const user = await User.findOne({ email });

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          success: true,
          res: user
        };
      } else {
        return {
          success: false,
          error: {
            statusCode: 401,
            msg: 'Invalid password'
          }
        };
      }
    } else {
      return {
        success: false,
        error: {
          statusCode: 404,
          msg: 'User not found'
        }
      };
    }
  } catch (error) {
    return {
      success: false,
      error: {
        statusCode: 500,
        msg: 'Login failed'
      }
    };
  }
};


export const updateUserPasswordRepo = async (id, newpassword, next) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      return {
        success: false,
        error: {
          statusCode: 404,
          msg: 'User not found'
        }
      };
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newpassword, 10);

    // Update the password
    user.password = hashedPassword;
    await user.save();

    return {
      success: true,
      res: user
    };
  } catch (error) {
    return {
      success: false,
      error: {
        statusCode: 500,
        msg: 'Password update failed'
      }
    };
  }
};
