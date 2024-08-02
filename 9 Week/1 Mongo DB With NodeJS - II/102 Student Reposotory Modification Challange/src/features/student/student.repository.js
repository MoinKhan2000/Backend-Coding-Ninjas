// Please don't change the pre-written code
// Import the necessary modules here

import { ObjectId } from "mongodb";
import { getClient, getDB } from "../../config/mongodb.js";

const collectionName = "students";

class studentRepository {
  async addStudent(studentData) {
    const db = getDB();
    await db.collection(collectionName).insertOne(studentData);
  }

  async getAllStudents() {
    const db = getDB();
    const students = await db.collection(collectionName).find({}).toArray();
    return students;
  }

  //You need to implement methods below:
  // Start Writing your code
  async createIndexes() {}

  async getStudentsWithAverageScore() {}

  async getQualifiedStudentsCount() {}

  async updateStudentGrade() {}
}

export default studentRepository;
