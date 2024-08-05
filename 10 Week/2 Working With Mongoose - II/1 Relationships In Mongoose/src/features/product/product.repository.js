import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js"
import { ApplicationError } from "../../errorHandler/applicatioonError.js";
import mongoose from "mongoose";
import { productSchema } from "./product.schema.js";
import { reviewSchema } from "./review.schema.js";

const ProductModel = mongoose.model("Product", productSchema)
const ReviewModel = mongoose.model("Review", reviewSchema)

class ProductRepository {
  constructor() {
    this.collection = "products";
  }

  async addProduct(newProduct) {
    try {

      const db = getDB();
      const collection = db.collection(this.collection);
      const result = await collection.insertOne(newProduct);
      if (result) {
        return newProduct
      } else {
        throw new ApplicationError('Product could not be added', 500)
      }
    } catch (error) {
      throw new ApplicationError('Product could not be added', 500)
    }
  }

  async getAllProducts() {
    try {
      const db = getDB()
      const collection = db.collection(this.collection)
      const products = await collection.find().toArray()
      return products
    } catch (error) {

      console.log(error);
      throw new ApplicationError('Something went wrong!', 500)
    }
  }

  async getProductById(id) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const result = await collection.findOne({ _id: new ObjectId(id) });
      console.log('resutl -> ', result);

      return result;
    } catch (error) {
      throw new ApplicationError('could not find product', 404)
    }
  }

  async filter(minPrice, maxPrice, category, brand, excludeOutOfStock = false, tags = [], sortBy = null, limit = 0, skip = 0) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);

      // Build the query object
      const query = {
        price: { $gte: parseFloat(minPrice) || 0, $lte: parseFloat(maxPrice) || 1e9 },
        category: { $regex: `.*${category}.*`, $options: 'i' }
      };

      // Add brand filter if provided
      if (brand) {
        query.brand = brand;
      }

      // Exclude out-of-stock products if specified
      if (excludeOutOfStock) {
        query.stock = { $gt: 0 };
      }

      // Add tags filter if provided
      if (tags.length > 0) {
        query.tags = { $all: tags };
      }

      // Initialize the find operation
      let findOperation = collection.find(query);

      // Add sorting if specified
      if (sortBy) {
        findOperation = findOperation.sort(sortBy);
      }

      // Add pagination if specified
      if (limit > 0) {
        findOperation = findOperation.limit(limit);
      }
      if (skip > 0) {
        findOperation = findOperation.skip(skip);
      }

      // Execute the query Normally
      // const result = await findOperation.toArray();
      // return result;

      // Execute the query usign project
      const result = await findOperation.project({ name: 1, price: 1, _id: 0 }).toArray();
      return result;

    } catch (error) {
      console.log(error);
      throw new ApplicationError('Something went wrong!', 500);
    }
  }


  //! This may arise the race condition.
  // async rateProduct(userId, id, rating) {
  //   try {
  //     const db = getDB();
  //     const collection = db.collection(this.collection);
  //     const product = await collection.findOne({ _id: new ObjectId(id) });
  //     if (!product) {
  //       throw new ApplicationError('Product not found', 404)
  //     }
  //     const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
  //     if (!user) {
  //       throw new ApplicationError('User not found', 404)
  //     }

  // Check if the user already rated the product if already rated then updating the rating.
  //     //? 1 Find the rating.
  //     const alreadyRated = product?.rating?.find(u => u.userId === userId)
  //     if (alreadyRated) {
  //       // product.rating = product.rating.map(u => u.userId === userId ? { ...u, rating } : u)
  //       //? 2. Update the rating.
  //       await collection.updateOne(
  //         {
  //           _id: new ObjectId(id),
  //           "rating.userId": userId
  //         },
  //         {
  //           $set: {
  //             "rating.$.rating": rating
  //           }
  //         }
  //       )
  //       return true
  //     }
  //     else {
  //       collection.updateOne({ _id: new ObjectId(id) },
  //         {
  //           $push: {
  //             rating: { userId, rating }
  //           }
  //         }
  //       )
  //     }
  //     return true
  //   } catch (error) {
  //     throw new ApplicationError('Something went wrong!', 500)
  //   }
  // }

  async rateProduct(userId, id, rating) {
    // try {
    //   const db = getDB();
    //   const collection = db.collection(this.collection);
    //   const product = await collection.findOne({ _id: new ObjectId(id) });
    //   if (!product) {
    //     throw new ApplicationError('Product not found', 404)
    //   }
    //   const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
    //   if (!user) {
    //     throw new ApplicationError('User not found', 404)
    //   }

    //   //? 1. Remove existing entry of rating
    //   await collection.updateOne(
    //     {
    //       _id: new ObjectId(id)
    //     },
    //     {
    //       $pull: {
    //         rating: { userId }
    //       }
    //     }
    //   )
    //   //? 2 Add new entry.
    //   collection.updateOne({ _id: new ObjectId(id) },
    //     {
    //       $push: {
    //         rating: { userId, rating }
    //       }
    //     }
    //   )
    //   console.log(product);

    //   return true
    // } catch (error) {
    //   throw new ApplicationError('Something went wrong!', 500)
    // }

    try {
      // 1. Check if the product exists.
      const productToUpdate = await ProductModel.findById(id);
      if (!productToUpdate) {
        throw new ApplicationError('Product not found', 404);
      }
      else {
        // 2. Check if the user has already rated the product.
        const userReview = await ReviewModel.findOne({ product: new ObjectId(id), user: new ObjectId(userId) });
        if (userReview) {
          // If the user has already reviewed the product, update the rating.
          userReview.rating = rating;
          await userReview.save();

          console.log("Updated userReview:", userReview);
        } else {
          // If the user has not reviewed the product yet, create a new review.
          const newReview = new ReviewModel({
            product: new ObjectId(id),
            user: new ObjectId(userId),
            rating,
          });
          await newReview.save();
          console.log("Created newReview:", newReview);
        }
      }
    } catch (error) {
      throw new ApplicationError('Something went wrong!', 500);
    }


  }

  async averagePrice() {
    try {
      const db = getDB();
      return await db.collection(this.collection)
        .aggregate([
          //  Stage 1: Get average price per category.
          {
            $group: {
              _id: "$category",
              averagePrice: { $avg: "$price" }
            }
          }
        ]).toArray()
    } catch (error) {
      throw new ApplicationError('could not find product', 404)
    }
  }

}




export default ProductRepository