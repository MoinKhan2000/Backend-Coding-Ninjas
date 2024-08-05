import mongoose, { Schema } from "mongoose";

export const productSchema = new Schema({
  name: String,
  price: Number,
  category: String,
  description: String,
  inStock: Number,
  // One product may have more than one reviews. 1 to many relationsips.
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
})