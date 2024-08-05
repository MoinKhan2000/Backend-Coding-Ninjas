import { ObjectId } from "mongodb";
import { getClinet, getDB } from "../../config/mongodb.js"
import { ApplicationError } from "../../errorHandler/applicatioonError.js"
import OrderModel from "./order.model.js";

export default class OrderRepository {
  constructor() {
    this.collection = 'orders'
  }
  async placeOrder(userId) {
    const client = getClinet()
    const session = client.startSession()
    try {
      const db = getDB()
      session.startTransaction();

      // 1. Get cartItems and calculate total amount.
      const items = await this.getTotalAmount(userId, session)
      const finalTotalAmount = items.reduce((acc, item) => acc + item.totalAmount, 0)
      console.log(finalTotalAmount);

      // 2. Create an order record.
      const newOrder = new OrderModel(new ObjectId(userId), totalAmount, new Date())
      const isCreated = await db.collection(this.collection).insertOne(newOrder, { session })

      // 3. Reduce the stock.
      for (let item of items) {
        await db.collection('products').updateOne(
          { _id: item.productId },
          { $inc: { stock: -item.quantity } },
          { session }
        )
      }

      // 9977837028 sonali maam 

      // 4. Clear the cart Items.
      await db.collection('cartItems').deleteMany({ userId: new ObjectId(userId) }, { session })
      session.commitTransactionn()
      session.endSession()

    } catch (error) {
      await session.abortTransasction()
      session.endSession()
      console.log(error);
      throw new ApplicationError('Something went wrong', 501)
    }
  }
  async getTotalAmount(userId, session) {
    const db = getDB()
    const items = await db.collection('cartItems').aggregate([
      // 1. Get cart items for the user
      {
        $match: {
          userId: new ObjectId(userId)
        }
      },
      // 2. Get the products from products collection.
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "productInfo"
        }
      },
      // // 3. Unwind the productInfo
      {
        $unwind: "$productInfo"
      },
      // 4. Calculate the total amount for each cart item.
      {
        $addFields: {
          "totalAmount": {
            $multiply: ["$productInfo.price", "$quantity"]
          }
        }
      }
    ],
      { session }
    ).toArray();
    return items

  }
}