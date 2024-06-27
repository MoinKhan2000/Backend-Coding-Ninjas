class JobModel {
    constructor(position, company, location, packagePerAnnum, skills, title, description, applicants, openings, expires, status, isTech, postedBy) {
        this.position = position;
        this.company = company;
        this.location = location;
        this.packagePerAnnum = packagePerAnnum;
        this.skills = skills;
        this.title = title;
        this.description = description;
        this.applicants = applicants;
        this.openings = openings;
        this.expires = expires;
        this.status = status;
        this.isTech = isTech;
        this.postedBy = postedBy;
        this.postedOn = new Date().toLocaleString();
        this.id = Number.parseInt(jobs.length) + 1;
    }

    static add(position, company, location, packagePerAnnum, skills, title, description, openings, expires, postedBy, isTech = true) {
        const job = new JobModel(position, company, location, packagePerAnnum, skills, title, description, [], openings, expires, 'active', isTech, postedBy);
        jobs.push(job);
        return job;
    }

    static update(loggedInUser, id, position, company, location, packagePerAnnum, skills, title, description, openings, expires, userEmail, isTech = true) {
        // const job = jobs.find(job => job.id === id);
        let jobIndex = jobs.findIndex((job) => {
            return job.id === parseInt(id) && job.postedBy === loggedInUser
        })
        if (jobIndex) {
            let skillArrray = skills.split(',').map(skill => skill.trim());
            jobs[jobIndex] = { id, position, company, location, packagePerAnnum, skills: skillArrray, title, description, openings, expires, userEmail, isTech, postedBy: loggedInUser, postedOn: new Date().toLocaleString() }
            return jobIndex === 0 ? 1 : jobIndex;
        } else {
            throw new Error('Job not found or user not authorized to update this job');
        }
    }

    static getAllJobs() {
        return jobs;
    }

    static getJobById(id) {
        const jobId = parseInt(id, 10);
        return jobs.find(job => job.id === jobId);
    }

    static getJobsByName(name) {
        let res = jobs.length > 0 ? jobs.filter((job) => {
            return job.title.toLowerCase().includes(name.toLowerCase());
        }) : [];
        return res;
    }

    static applyToJob(jobId, applicant) {
        const job = jobs.find(job => job.id === jobId);
        if (job) {
            job.applicants.push(applicant);
            // console.log(applicant);
            return true;
        }
        return false;
    }

    static getJobsByEmail(email) {
        const result = jobs.length > 0 ? jobs.filter((job) => {
            return job.postedBy === email;
        }) : [];
        return result;
    }

    static delete(id) {
        const jobIndex = jobs.findIndex(job => job.id === parseInt(id, 10));
        if (jobIndex !== -1) {
            jobs.splice(jobIndex, 1);
        } else {
            throw new Error('Job not found');
        }
    }
    static getApplicants(id) {
        const result = jobs.filter((job) => { job.id === id });
        return result.applicants
    }
}

// Dummy data for tech industry jobs
const jobs = [];

JobModel.add(
    "Front End Developer",
    "Mk Officials",
    "Betul Madhya Pradesh",
    "$145,000 - $148,000",
    ["React", "HTML", "CSS", "JS", "JQuery", "GSAP", "TailwindCSS"],
    "Front End Developer",
    "We are looking for a skilled Front End Developer to join our team.",
    7,
    "2024-08-10",
    "admin@example.com"
)

// Add more jobs in the specified format
JobModel.add(
    "Backend Developer",
    "Tech Solutions Ltd.",
    "San Francisco, CA",
    "$120,000 - $150,000 per annum",
    ["Node.js", "Express", "MongoDB", "RESTful APIs"],
    "Backend Developer",
    "Seeking a Backend Developer with strong Node.js and MongoDB skills.",
    2,
    "2024-08-15",
    "moink3181@gmail.com",
);

JobModel.add(
    "Full Stack Developer",
    "Innovative Tech Solutions",
    "New York, NY",
    "$130,000 - $160,000 per annum",
    ["React", "Node.js", "MongoDB", "GraphQL"],
    "Full Stack Developer",
    "Join our team as a Full Stack Developer and work on exciting projects.",
    2,
    "2024-08-05",
    "moink3181@gmail.com",
);

JobModel.add(
    "DevOps Engineer",
    "Cloud Services Inc.",
    "Seattle, WA",
    "$140,000 - $160,000 per annum",
    ["Docker", "Kubernetes", "AWS", "CI/CD"],
    "DevOps Engineer",
    "Looking for a DevOps Engineer to manage our cloud infrastructure.",
    1,
    "2024-07-25",
    "admin@example.com"
);

// Export the JobModel and jobs array
export { JobModel, jobs };
