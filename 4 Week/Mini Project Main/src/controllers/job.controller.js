import { sendApplicationReceivedEmail } from '../middlewares/sendMail.js';
import { JobModel } from '../models/job.model.js';

class JobsController {
    constructor() {
        this.getJobs = this.getJobs.bind(this);
        this.getSingleJob = this.getSingleJob.bind(this);
        this.getJobBySearch = this.getJobBySearch.bind(this);
        this.getAddJob = this.getAddJob.bind(this);
        this.postAddJob = this.postAddJob.bind(this);
        this.getYourJobs = this.getYourJobs.bind(this);
        this.getUpdateJobView = this.getUpdateJobView.bind(this);
        this.postUpdateJob = this.postUpdateJob.bind(this);
        this.deleteJob = this.deleteJob.bind(this);
    }

    getDeleteConfirmation(req, res) {
        const jobId = req.params.id;
        res.render('delete-confirmation', { jobId });
    }

    getJobs(req, res, next) {
        var jobs = JobModel.getAllJobs();
        res.render('jobs', {
            jobs,
            userEmail: req.session.userEmail,
            errorMessage: null,
        });
    }

    getSingleJob(req, res, next) {
        var id = req.params.id;
        var job = JobModel.getJobById(id);
        res.render('job', {
            job,
            userEmail: req.session.userEmail,
            errorMessage: null,
        });
    }

    getJobBySearch(req, res, next) {
        let name = req.body.name;
        var jobs = JobModel.getJobsByName(name);
        res.render('jobs', {
            jobs,
            userEmail: req.session.userEmail,
            errorMessage: null,
        });
    }

    getAddJob(req, res, next) {
        res.render('new-job', {
            errorMessage: null,
            job: null,
            userEmail: req.session.userEmail,
        });
    }

    postAddJob(req, res, next) {
        const { position, company, location, packagePerAnnum, skills, title, description, openings, expires, isTech } = req.body;
        const postedBy = req.session.userEmail;
        const skillsArray = skills.split(',').map(skill => skill.trim());

        JobModel.add(position, company, location, packagePerAnnum, skillsArray, title, description, openings, expires, postedBy, isTech);
        var jobs = JobModel.getAllJobs();
        res.render('jobs', {
            jobs,
            userEmail: req.session.userEmail,
            errorMessage: "Success : Job has been added successfully.",
        });
    }

    getYourJobs(req, res, next, errorMessage = null) {
        let email = req.session.userEmail;
        let result = JobModel.getJobsByEmail(email);

        if (result.length > 0) {
            res.render('jobs', {
                jobs: result,
                userEmail: req.session.userEmail,
                errorMessage: errorMessage,
            });
        } else {
            errorMessage = "Warning: You haven't posted any jobs.";
            res.render('jobs', {
                jobs: result,
                userEmail: req.session.userEmail,
                errorMessage: errorMessage,
            });
        }
    }


    getUpdateJobView(req, res, next) {
        // 1. if job exists then return view
        const id = req.params.id;
        const jobFound = JobModel.getJobById(id);
        if (jobFound) {
            res.render('update-job', {
                job: jobFound,
                errorMessage: null,
                userEmail: req.session.userEmail,
            });
        }
        // 2. else return errors.
        else {
            res.status(401).send('Job not found');
        }
    }

    postUpdateJob(req, res, next) {
        const { position, company, location, packagePerAnnum, skills, title, description, openings, expires, postedBy } = req.body;
        const id = req.params.id;
        const loggedInUser = req.session.userEmail;

        // Update the job and check the result
        const result = JobModel.update(loggedInUser, id, position, company, location, packagePerAnnum, skills, title, description, openings, expires, postedBy);

        // Check if the update was successful
        if (result) {
            // If successful, get updated job list and render your jobs page
            this.getYourJobs(req, res, next, 'Success : Job has been updated successfully');
        } else {
            // If not successful, render the update-job page again with an error message
            const job = JobModel.getJobById(id);
            res.render('update-job', { job, userEmail: req.session.userEmail, errorMessage: result });
        }
    }

    deleteJob(req, res, next) {
        const id = req.params.id;
        const jobFound = JobModel.getJobById(id);

        if (!jobFound) {
            return res.status(404).send('Job not found');
        }

        if (jobFound.postedBy !== req.session.userEmail) {
            return res.status(403).send('You are not authorized to delete this job');
        }

        JobModel.delete(id);
        this.getYourJobs(req, res, next, 'Success : Job has been deleted successfully');
    }


    applyToJob(req, res, next) {
        const id = Number.parseInt(req.params.id)
        const jobFound = JobModel.getJobById(id);
        // console.log(req.body);
        res.render('apply', { job: jobFound, errorMessage: null, user: null })
    }

    applyToJobPost(req, res, next) {
        const jobId = Number.parseInt(req.params.id)
        const jobFound = JobModel.getJobById(jobId);
        const { name, email, mobile, yearOfGraduation, cgpa } = req.body
        const resumeUrl = 'resumes/' + req.file.filename;
        const applicant = { name, email, mobile, yearOfGraduation, cgpa, resumeUrl }
        let result = JobModel.applyToJob(jobId, applicant)
        if (result) {
            res.render(`apply`, { job: jobFound, errorMessage: 'Success : Submitted Successfully We will update you throw your email.', userEmail: req.session.userEmail, user: null })
            sendApplicationReceivedEmail(
                applicant.email,
                applicant.name,
                jobFound.position,
                jobFound.company,
                jobFound.location,
                jobFound.packagePerAnnum,
                jobFound.skills,
                jobFound.title,
                jobFound.description,
                jobFound.applicants.length,
                jobFound.openings,
                jobFound.expires,
                jobFound.status,
                jobFound.isTech,
                jobFound.postedBy
            );
        }
    }

    getApplicants(req, res, next) {
        const jobId = Number.parseInt(req.params.id)
        const jobFound = JobModel.getJobById(jobId);
        const applicants = JobModel.getApplicants(jobId);
        res.render('applicants', { job: jobFound, applicants: applicants, errorMessage: null, userEmail: req.session.userEmail })
    }
}

export default JobsController;
