import mongoose from "mongoose";

// Define the Task schema
const taskSchema = new mongoose.Schema({
    text: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create a Task model from the schema
const Task = mongoose.model('Task', taskSchema);

export default Task;
