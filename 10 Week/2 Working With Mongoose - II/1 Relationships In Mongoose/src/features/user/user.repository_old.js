import { getDB } from "../../config/mongodb.js"
import { ApplicationError } from "../../errorHandler/applicatioonError.js"

class UserRepository {
  async signUp(newUser) {
    try {
      // 1. Get the DataBase 
      const db = getDB()

      // 2. Get the Collection.
      const collection = db.collection('users')

      // 3. Check if the user already exists.
      let user = await collection.findOne({ email: newUser.email })
      if (!user) {
        // 4. Insert the document 
        await collection.insertOne(newUser)
        return newUser
      }
      // Returning null if the user already present
      throw new ApplicationError("User already present", 501)
    } catch (error) {
      console.log(error);
      return null
    }
  }

  async signIn(email, password) {
    try {
      // 1. Get the DataBase 
      const db = getDB()

      // 2. Get the Collection.
      const collection = db.collection('users')

      // 3. Check if the user already exists.
      let user = await this.findByEmail(email)
      if (!user) {
        // 4. Insert the document 

      }
      // Returning null if the user already present
      return null
    } catch (error) {
      console.log(error);
      return null
    }
  }
  async findByEmail(email) {
    try {
      // 1. Get the DataBase 
      const db = getDB()

      // 2. Get the Collection.
      const collection = db.collection('users')

      // 3. Check if the user present.
      let user = await collection.findOne({ email })
      if (!user) {
        return null
      }
      return user
    } catch (error) {
      console.log(error);
      return null
    }
  }
}

export default UserRepository