import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js"
import { ApplicationError } from "../../errorHandler/applicatioonError.js";

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

  async filter(minPrice, maxPrice, category) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const result = await collection.find({
        price: { $gte: parseFloat(minPrice) || 0, $lte: parseFloat(maxPrice) || 1e9 },
        category: { $regex: `.*${category}.*`, $options: 'i' }
      }).toArray();
      return result;
    } catch (error) {
      console.log(error);
      throw new ApplicationError('Something went wrong!', 500)
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

  //     // Check if the user already rated the product if already rated then updating the rating.

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
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const product = await collection.findOne({ _id: new ObjectId(id) });
      if (!product) {
        throw new ApplicationError('Product not found', 404)
      }
      const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
      if (!user) {
        throw new ApplicationError('User not found', 404)
      }


      //? 1. Remove existing entry of rating
      await collection.updateOne(
        {
          _id: new ObjectId(id)
        },
        {
          $pull: {
            rating: { userId }
          }
        }
      )
      //? 2 Add new entry.
      collection.updateOne({ _id: new ObjectId(id) },
        {
          $push: {
            rating: { userId, rating }
          }
        }
      )
      console.log(product);

      return true
    } catch (error) {
      throw new ApplicationError('Something went wrong!', 500)
    }
  }
}


export default ProductRepository