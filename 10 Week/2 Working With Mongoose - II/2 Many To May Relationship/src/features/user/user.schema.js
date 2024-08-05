import mongoose, { Schema } from "mongoose";
export const userSchema = new Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  type: { type: String, enum: ['customer', 'seller'] }
})