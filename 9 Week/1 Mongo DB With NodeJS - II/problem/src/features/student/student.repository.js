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

  // Method to create indexes
  async createIndexes() {
    const db = getDB();
    await db.collection(collectionName).createIndex({ name: 1 }); // Single-field index on 'name'
    await db.collection(collectionName).createIndex({ age: 1, grade: -1 }); // Compound index on 'age' (asc) and 'grade' (desc)
  }

  // Method to get students with average score
  async getStudentsWithAverageScore() {
    const db = getDB();
    const result = await db.collection(collectionName).aggregate([
      { $unwind: "$assignments" }, // Unwind the assignments array
      {
        $group: {
          _id: "$name", // Group by student name
          averageScore: { $avg: "$assignments.score" } // Calculate average score
        }
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          averageScore: 1
        }
      }
    ]).toArray();

    return result;
  }

  // Method to get count of qualified students
  async getQualifiedStudentsCount() {
    const db = getDB();
    const count = await db.collection(collectionName).countDocuments({
      age: { $gt: 9 },
      grade: { $lte: "B" },
      assignments: {
        $elemMatch: { title: "math", score: { $gte: 60 } }
      }
    });
    return count;
  }

  // Method to update student's grade based on assignment scores
  async updateStudentGrade(studentId, extraCreditPoints) {
    const client = await getClient();
    const db = getDB();

    const session = client.startSession();

    try {
      session.startTransaction();

      // Find the student
      const student = await db.collection(collectionName).findOne({ _id: new ObjectId(studentId) });

      if (!student) {
        throw new Error("Student not found");
      }

      // Apply extra credit points to all assignments
      const updatedAssignments = student.assignments.map(assignment => ({
        ...assignment,
        score: assignment.score + extraCreditPoints
      }));

      // Calculate new average score
      const averageScore = updatedAssignments.reduce((acc, assignment) => acc + assignment.score, 0) / updatedAssignments.length;

      // Determine new grade based on the grading scale
      let newGrade;
      if (averageScore >= 90) newGrade = "A";
      else if (averageScore >= 80) newGrade = "B";
      else if (averageScore >= 70) newGrade = "C";
      else if (averageScore >= 60) newGrade = "D";
      else newGrade = "F";

      // Update the student record atomically
      await db.collection(collectionName).updateOne(
        { _id: new ObjectId(studentId) },
        { $set: { assignments: updatedAssignments, grade: newGrade } },
        { session }
      );

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}

export default studentRepository;
