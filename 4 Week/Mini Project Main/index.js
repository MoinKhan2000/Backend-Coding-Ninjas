import express from 'express';
import RecruiterController from './src/controllers/recruiter.controller.js';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';
import validationMiddleware from './src/middlewares/validation.middleware.js';
import { uploadFile } from './src/middlewares/file-upload.middleware.js';
import session from 'express-session';
import { auth } from './src/middlewares/auth.middleware.js';
import cookieParser from 'cookie-parser';
import { setLastVisit } from './src/middlewares/lastVisit.middleware.js';
import HomeController from './src/controllers/home.controller.js';
import JobsController from './src/controllers/job.controller.js';
import applyValidateRequest from './src/middlewares/applyValidateRequest.js';

const app = express();

// Middleware to serve static files from the "public" directory
app.use(express.static('public'));

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to manage user sessions
app.use(
  session({
    secret: 'SecretKey',  // Secret key to sign the session ID cookie
    resave: false,        // Prevents session from being saved back to the session store if it wasn't modified
    saveUninitialized: true,  // Forces a session that is "uninitialized" to be saved to the store
  })
);

// Initialize controllers
const recruiterController = new RecruiterController();
const homeController = new HomeController();
const jobController = new JobsController();

// Middleware to use EJS layouts
app.use(ejsLayouts);

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(path.resolve(), 'src', 'views'));

// Route to render the home page
app.get('/', homeController.getHome);

// Routes for login
app.get('/login', recruiterController.getLogin); // Render the login page
app.post('/login', setLastVisit, recruiterController.postLogin); // Handle login form submission and set last visit if successful

// Routes for registration
app.get('/register', recruiterController.getRegister);
app.post('/register', recruiterController.postRegister);

// Route to show all available jobs
app.get('/jobs', jobController.getJobs);

// Route to get a single job by ID
app.get('/jobs/:id', jobController.getSingleJob);

// Route to search for jobs using a search input
app.post('/job-search', jobController.getJobBySearch);

// Routes to add jobs to the job list (requires authentication)
app.get('/new-job', auth, jobController.getAddJob);
app.post('/new-job', auth, validationMiddleware, jobController.postAddJob);

// Route to get jobs posted by the logged-in user (requires authentication)
app.get('/your-job', auth, jobController.getYourJobs);

// Routes to update a job by ID (requires authentication)
app.get('/jobs/:id/update', auth, jobController.getUpdateJobView);
app.post('/jobs/:id/update', auth, validationMiddleware, jobController.postUpdateJob);

// Route to delete a job by ID (requires authentication)
app.get('/jobs/:id/delete', auth, jobController.getDeleteConfirmation);
app.post('/jobs/:id/delete', auth, jobController.deleteJob);

// Route to log out (requires authentication)
app.get('/logout', auth, recruiterController.logout);

// Routes to apply to a job (includes form view and form submission)
app.get('/apply/:id', jobController.applyToJob);
app.post('/apply/:id', uploadFile.single('resume'), applyValidateRequest, jobController.applyToJobPost);

// Route to view applicants for a specific job (requires authentication)
app.get('/jobs/:id/applicants', auth, jobController.getApplicants);

// Route to handle Error Page.
app.use((req, res, next) => {
  res.status(404).render('error', { message: 'Page not found.' });
});

// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
