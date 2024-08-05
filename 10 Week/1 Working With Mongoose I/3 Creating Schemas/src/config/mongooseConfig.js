import mongoose from "mongoose";
const url = process.env.DB_URL
mongoose.connect(url)

export const connectUsingMongoose = async () => {
  try {
    await mongoose.connect(url, { useNewParser: true, useUnifiedTopolgy: true })
    console.log('connected using mongoose');

  } catch (error) {

  }
};