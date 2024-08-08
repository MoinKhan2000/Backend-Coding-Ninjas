// Import the necessary modules here
import { customErrorHandler } from "../../middlewares/errorHandler.js";
import { applyJobRepo, createNewJob, findJobRepo } from "./job.repository.js";

export const postJob = async (req, res, next) => {
  if (req.user.type !== 'recruiter') {
    return next(new customErrorHandler(400, "Only recruiters can post jobs"));
  }

  try {
    const resp = await createNewJob(req.body);
    if (resp) {
      res.status(201).json({
        success: true,
        msg: "Job posted successfully",
        job_description: resp,
      });
    } else {
      res.status(400).json({ success: false, msg: "Bad request" });
    }
  } catch (error) {
    console.error("Error in postJob:", error);
    next(new customErrorHandler(500, "Failed to post job"));
  }
};

export const applyJob = async (req, res, next) => {
  const job_id = req.params.id;
  const user_id = req.user._id;

  try {
    const job_description = await findJobRepo(job_id);
    if (!job_description) {
      return next(new customErrorHandler(404, "Job not found"));
    }

    const resp = await applyJobRepo(job_id, user_id);
    if (resp) {
      res.status(201).json({
        success: true,
        msg: "Job applied successfully",
        resp: resp,
      });
    } else {
      res.status(400).json({
        success: false,
        msg: "You have already applied for this job",
      });
    }
  } catch (error) {
    console.error("Error in applyJob:", error);
    next(new customErrorHandler(error.statusCode || 500, error.message || "Failed to apply for the job"));
  }
};
