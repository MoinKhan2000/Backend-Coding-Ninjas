import mongoose from 'mongoose';
const chatSchema = new mongoose.Schema({
  userName: String,
  message: String
}, { timestamps: true }
)

const ChatModel = mongoose.model('Chat', chatSchema)
export default ChatModel