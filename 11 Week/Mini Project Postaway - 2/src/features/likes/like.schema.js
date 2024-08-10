import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likeable: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'types',
    required: true,
  },
  types: {
    type: String,
    enum: ['Comment', 'Post'],
    required: true,
  },
  isLike: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true
});

export const LikeModel = mongoose.model('Like', likeSchema);
