import mongoose from 'mongoose'
const messageSchema = new mongoose.Schema({
  username: String,
  text: String,
  room: String,
  timeStamp: Date
}, {
  timestamps: true
})

const MessageModel = mongoose.model('Message', messageSchema)
export default MessageModel




