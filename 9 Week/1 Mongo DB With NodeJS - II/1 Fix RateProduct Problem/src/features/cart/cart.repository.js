import { ObjectId } from "mongodb"
import { getDB } from "../../config/mongodb.js"
import { ApplicationError } from "../../errorHandler/applicatioonError.js"

export default class CartRepository {

  constructor() {
    this.collection = 'cartItems'
  }

  //? Normal way of doing
  // async add(productId, userId, quantity) {
  //   try {
  //     const db = getDB()
  //     const collection = db.collection(this.collection)
  //     // If user already added the item into the cart then updating the cart.
  //     const existingItem = await collection.findOne({ productId: new ObjectId(productId), userId: new ObjectId(userId) })
  //     if (existingItem) {
  //       await collection.updateOne({ productId: new ObjectId(productId), userId: new ObjectId(userId) }, { $set: { quantity } })
  //       return existingItem
  //     }
  //     const result = await collection.insertOne({ productId: new ObjectId(productId), userId: new ObjectId(userId), quantity })
  //     return result
  //   } catch (error) {
  //     throw new ApplicationError("Could not added into cart", 501)
  //   }
  // }

  //? Ordinary way of doing.
  async add(productId, userId, quantity) {
    try {
      const db = getDB()
      const collection = db.collection(this.collection)
      const result = await collection.updateOne(
        { productId: new ObjectId(productId), userId: new ObjectId(userId) },
        { $inc: { quantity } },
        { upsert: true }
      )
      return result
    } catch (error) {
      ApplicationError('Could not add into cart', 501)
    }
  }
  async getAllCartItems() {
    try {
      const db = getDB()
      const collection = db.collection(this.collection)
      const cartItems = await collection.find().toArray()
      return cartItems
    } catch (error) {
      []
    }
  }
  async getCartOfUser(userId) {
    try {
      const db = getDB()
      const collection = db.collection(this.collection)
      const cartItems = await collection.find({ userId: new ObjectId(userId) }).toArray()
      return cartItems
    } catch (error) {

    }
  }
  async deleteFromCart(userId, productId) {
    try {
      const db = getDB()
      const collection = db.collection(this.collection)
      const result = await collection.deleteOne({ productId: new ObjectId(productId), userId: new ObjectId(userId) })
      result.success = true
      return result
    } catch (error) {
      return { success: false, error: error }
    }
  }
}