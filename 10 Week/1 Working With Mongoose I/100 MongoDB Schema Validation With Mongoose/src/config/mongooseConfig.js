// Please don't change the pre-written code
// Import the necessary modules here

import mongoose from "mongoose";

export const connectUsingMongoose = async () => {
  try {
    const url = "mongodb://localhost:27017"
    await mongoose.connect(url)
    console.log('Connecting to Mongoose database');
  } catch (error) {
    console.log(error);
  }
};
