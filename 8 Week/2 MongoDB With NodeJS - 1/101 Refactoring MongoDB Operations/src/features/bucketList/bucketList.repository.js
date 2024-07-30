// Please don't change the pre-written code
// Import the necessary modules here

import { getDB } from "../../config/mongodb";

class BucketListRepository {
  constructor() {
    this.collection = "bucketListItems";
  }
  async addBucketListItem(bucketListItem) {
    try {
      let db = getDB()
      let collection = db.collection(this.collection)
      await collection.insertOne(bucketListItem)
      return bucketListItem
    } catch (error) {
      console.log(error);
    }
  }

  async findOneBucketListItem(title) {
    try {
      let db = getDB()
      let collection = db.collection(this.collection)
      const buektListItem = await collection.findOne({ title })
      return buektListItem
    } catch (error) {
      console.log(error);
    }
  }
}

export default BucketListRepository;
