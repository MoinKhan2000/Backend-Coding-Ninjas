// Import the necessary modules here
import mongoose from 'mongoose';

export const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likeable: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'on_model',
    required: true
  },
  on_model: {
    type: String,
    required: true,
    enum: ['Job', 'User']
  }
});
