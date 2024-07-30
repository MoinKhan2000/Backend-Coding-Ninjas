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

}


export default ProductRepository