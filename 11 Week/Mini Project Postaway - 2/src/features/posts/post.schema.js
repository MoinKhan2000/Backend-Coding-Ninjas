import mongoose from 'mongoose';

// Define the Post schema
const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Like'
    }
  ]
}, {
  timestamps: true
});

// Create and export the Post model
export const PostModel = new mongoose.model('Post', postSchema);

