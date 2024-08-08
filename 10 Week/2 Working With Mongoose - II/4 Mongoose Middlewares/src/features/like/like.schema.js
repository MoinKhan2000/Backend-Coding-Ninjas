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

LikeSchema.pre('save', (next) => {
  console.log('Someone is going to like ');
  next();
})

LikeSchema.post('save', (doc) => {
  console.log('Liked successfully');
  console.log(doc);
})

LikeSchema.pre('find', (next) => {
  console.log('Someone is going to find likes');
  next();
})