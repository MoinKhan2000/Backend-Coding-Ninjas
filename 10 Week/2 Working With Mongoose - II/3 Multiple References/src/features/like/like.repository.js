import mongoose from "mongoose";
import { LikeSchema } from "./like.schema.js";
import { ApplicationError } from "../../errorHandler/applicatioonError.js"
const { ObjectId } = mongoose.Types;


const LikeModel = mongoose.model('Like', LikeSchema)
export class LikeRepository {

  async likeProduct(userId, productId) {
    try {
      const newLike = new LikeModel(
        {
          user: new ObjectId(userId),
          likeable: new ObjectId(productId),
          types: 'Product'
        }
      )
      await newLike.save()
      return newLike
    } catch (error) {
      throw new ApplicationError('Something went wrong', 500)
    }
  }


  async likeCategory(userId, categoryId) {
    try {
      const newLike = new LikeModel(
        {
          user: new ObjectId(userId),
          likeable: new ObjectId(categoryId),
          types: 'Category'
        }
      )
      await newLike.save()
      return newLike
    } catch (error) {
      throw new ApplicationError("Something went wrong", 500)
    }
  }

  async getLikes(type, id) {
    try {
      return await LikeModel.find({
        likeable: new ObjectId(id),
        types: type
      })
        .populate('user')
        .populate({ path: 'likeable', model: type })
        .populate({ path: "_id", model: 'Product' })
    } catch (error) {
      throw new ApplicationError("Something went wrong", 500)
    }
  }
}