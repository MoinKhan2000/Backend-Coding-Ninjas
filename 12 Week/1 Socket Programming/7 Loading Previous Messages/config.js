import mongoose from 'mongoose';
export const connectToDB = async () => {
  await mongoose.connect("mongodb://localhost:27017/chatApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log('Connected to Mongodb');
}