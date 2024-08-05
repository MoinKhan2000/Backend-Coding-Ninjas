import mongoose, { Schema } from "mongoose";

export const productSchema = new Schema({
  name: String,
  price: Number,
  desc: String,
  inStock: Number,
  sizes: [],
  // One product may have more than one reviews. 1 to many relationsips.
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    }
  ],
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    }
  ]
})

