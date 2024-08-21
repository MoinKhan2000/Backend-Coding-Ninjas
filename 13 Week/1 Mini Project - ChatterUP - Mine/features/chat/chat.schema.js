import mongoose from "mongoose";
const chatSchema = new mongoose.Schema({
  message: String,
  recipient: String,
  room: String,
  sender: String,
  receiver: String
},
  { timestamps: true })

const ChatModel = mongoose.model('Chat', chatSchema);
export default ChatModel