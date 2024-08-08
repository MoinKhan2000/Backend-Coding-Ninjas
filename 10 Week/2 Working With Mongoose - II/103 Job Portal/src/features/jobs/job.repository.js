import mongoose from "mongoose";
import { jobSchema } from "./schema/newJob.schema.js";
import { applyJobSchema } from "./schema/applyJob.schema.js";
import { customErrorHandler } from "../../middlewares/errorHandler.js";

const JobModel = mongoose.model('Job', jobSchema);
const ApplyJobModel = mongoose.model('ApplyJob', applyJobSchema);

export const createNewJob = async (job) => {
  try {
    const newJob = new JobModel(job);
    console.log(newJob);

    const result = await newJob.save();
    return result;
  } catch (error) {
    console.error("Error in createNewJob:", error);
    throw new customErrorHandler(500, "Failed to create a new job. Please try again.");
  }
};

export const applyJobRepo = async (jobId, userId) => {
  try {
    // Check if the user has already applied for the job
    const alreadyApplied = await ApplyJobModel.findOne({ jobId, userId });
    if (alreadyApplied) {
      return false;
    }

    // Create a new application
    const newApplication = new ApplyJobModel({ jobId, userId });
    await newApplication.save();

    // Update the job document by adding the user's ID to the applicants array
    const updatedJob = await JobModel.findByIdAndUpdate(
      jobId,
      { $addToSet: { applicants: userId } }, // Use $addToSet to avoid duplicates
      { new: true } // Return the updated job document
    );

    return updatedJob;
  } catch (error) {
    console.error("Error in applyJobRepo:", error);
    throw new customErrorHandler(500, "Failed to apply for the job. Please try again.");
  }
};



export const findJobRepo = async (_id) => {
  try {
    const job = await JobModel.findById(_id);
    if (!job) {
      throw new customErrorHandler(404, "Job not found");
    }
    return job;
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      throw new customErrorHandler(400, "Invalid job ID format");
    } else {
      console.error("Error in findJobRepo:", error);
      throw new customErrorHandler(500, "Failed to retrieve the job. Please try again.");
    }
  }
};


