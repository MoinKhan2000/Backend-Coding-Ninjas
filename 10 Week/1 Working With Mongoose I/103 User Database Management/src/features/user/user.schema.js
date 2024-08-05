import mongoose, { Schema } from "mongoose";

// Define the user schema
export const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ // Valid email format regex
  },
  mobile: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['student', 'fresher', 'experienced'] // Allow only specific values
  }
});

