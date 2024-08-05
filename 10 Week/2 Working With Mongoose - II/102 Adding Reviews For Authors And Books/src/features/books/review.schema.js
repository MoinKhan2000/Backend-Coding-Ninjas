import mongoose from "mongoose";
export const reviewSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  targetId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'target'
  },
  target: {
    type: String,
    enum: ['Author', 'Book'],
  }
});
