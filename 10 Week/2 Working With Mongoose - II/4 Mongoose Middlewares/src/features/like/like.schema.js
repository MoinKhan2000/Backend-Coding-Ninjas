import mongoose from "mongoose";
export const LikeSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  likeable: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'types'  //? having multiple references. check the types 
  },
  types: {            //? types defined two types of Collection either product or category.
    type: String,
    enum: ['Product', 'Category']
  }
})