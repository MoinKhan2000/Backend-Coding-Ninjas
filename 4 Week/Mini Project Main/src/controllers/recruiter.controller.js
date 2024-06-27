import RecruiterModel from '../models/recruiter.model.js';
import { JobModel, jobs } from '../models/job.model.js';


export default class UserController {
  getRegister(req, res) {
    res.render('register', { errorMessage: null });
  }

  getLogin(req, res) {
    res.render('login', { errorMessage: null });
  }

  postRegister(req, res) {
    const { name, email, password } = req.body;
    let result = RecruiterModel.add(name, email, password);
    if (result) res.render('login', { errorMessage: null });
    else res.render('register', { errorMessage: 'Warning : User with this email is already registered' });
  }

  postLogin(req, res) {
    const { email, password } = req.body;
    const user = RecruiterModel.isValidUser(
      email,
      password
    );
    if (!user) {
      return res.render('login', {
        errorMessage: 'Invalid Credentials',
      });
    }
    req.session.userEmail = email;
    var products = JobModel.getAllJobs()
    res.render('jobs', {
      jobs: products,
      userEmail: req.session.userEmail,
      errorMessage: null
    });
  }

  logout(req, res) {
    // on logout, destroy the session
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/login');
      }
    });
    res.clearCookie('lastVisit');
  }
}
