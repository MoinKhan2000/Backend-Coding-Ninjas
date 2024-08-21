import mongoose from 'mongoose';
const connectToDB = async () => {
  await mongoose.connect("mongodb://localhost:27017/chatApp")
  console.log('Connected to Mongodb');
}

export default connectToDB;