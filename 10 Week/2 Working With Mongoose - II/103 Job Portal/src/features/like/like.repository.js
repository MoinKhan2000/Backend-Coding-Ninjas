import mongoose from "mongoose";
import { likeSchema } from "./like.schema.js";
import { customErrorHandler } from "../../middlewares/errorHandler.js";

// Create the like model
const LikeModel = mongoose.model('Like', likeSchema);

export const likeRepo = async (userId, jobId, model) => {
  try {
    // Convert IDs to ObjectId
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const jobObjectId = new mongoose.Types.ObjectId(jobId);

    // Check if the user has already liked the job
    const alreadyLiked = await LikeModel.findOne({ user: userObjectId, likeable: jobObjectId, on_model: model });
    if (alreadyLiked) {
      throw customErrorHandler('Already liked', 400);
    }

    // Create a new like entry
    const like = new LikeModel({ user: userObjectId, likeable: jobObjectId, on_model: model });
    await like.save();

    return like;
  } catch (error) {
    console.error("Error in likeRepo:", error);
    throw customErrorHandler('Failed to process like. Please try again.', 500);
  }
};

export const getLikesRepo = async (id, on_model) => {
  try {
    // Convert id to ObjectId
    const objectId = new mongoose.Types.ObjectId(id);

    // Find likes based on id and on_model
    const likes = await LikeModel.find({ likeable: objectId, on_model })
      .populate('user')
      .populate({
        path: 'likeable',
        populate: {
          path: 'applicants',
          select: '_id name email mobile age type',
        }
      })
      .exec();

    return likes;
  } catch (error) {
    console.error("Error in getLikesRepo:", error);
    throw new customErrorHandler('Failed to retrieve likes. Please try again.', 500);
  }
};
