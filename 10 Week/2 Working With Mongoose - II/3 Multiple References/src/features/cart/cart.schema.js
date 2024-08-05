import mongoose, { Schema } from "mongoose";

export const cartItemSchema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
})