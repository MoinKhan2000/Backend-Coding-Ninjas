import { getDB } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";

class ExpenseRepository {
  constructor() {
    this.collectionName = "expenses"; // name of the collection in mongodb
  }

  // Create a new expense
  async addExpense(expense) {
    try {
      const db = getDB();
      const collection = db.collection(this.collectionName);
      const result = await collection.insertOne(expense);
      if (result) return result;
      else return null
    } catch (error) {
      console.error("Error in addExpense:", error);
      return null;
    }
  }

  // Get one expense by its ID
  async getOne(id) {
    try {
      const db = getDB();
      const collection = db.collection(this.collectionName);
      const result = await collection.findOne({ _id: new ObjectId(id) });
      return result;
    } catch (error) {
      console.error("Error in getOne:", error);
      return null;
    }
  }

  // Get all expenses
  async getAllExpenses() {
    try {
      const db = getDB();
      const collection = db.collection(this.collectionName);
      const result = await collection.find().toArray();
      return result;
    } catch (error) {
      console.error("Error in getAllExpenses:", error);
      return [];
    }
  }

  // Add tag to an expense
  async addTagToExpense(id, tag) {
    try {
      const db = getDB();
      const collection = db.collection(this.collectionName);
      const result = await collection.updateOne(
        { _id: id },
        { $addToSet: { tags: tag } }
      );
      return result.modifiedCount > 0;
    } catch (error) {
      console.error("Error in addTagToExpense:", error);
      return false;
    }
  }

  // Filter expenses based on date, amount, and isRecurring field
  async filterExpenses(criteria) {
    try {
      const db = getDB();
      const collection = db.collection(this.collectionName);

      // Build the query object based on provided criteria
      const query = {};

      if (criteria.minAmount) {
        query.amount = { $gte: criteria.minAmount };
      }

      if (criteria.maxAmount) {
        query.amount = query.amount || {};
        query.amount.$lte = criteria.maxAmount;
      }

      if (criteria.isRecurring !== undefined) {
        query.isRecurring = criteria.isRecurring;
      }

      if (criteria.startDate) {
        query.date = { $gte: new Date(criteria.startDate) };
      }

      if (criteria.endDate) {
        query.date = query.date || {};
        query.date.$lte = new Date(criteria.endDate);
      }

      const result = await collection.find(query).toArray();
      return result;
    } catch (error) {
      console.error("Error in filterExpenses:", error);
      return [];
    }
  }
}

export default ExpenseRepository;
