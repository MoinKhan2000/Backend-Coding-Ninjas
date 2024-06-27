import { body, validationResult } from 'express-validator';
import { JobModel } from '../models/job.model.js';

const validateRequest = async (req, res, next) => {
  console.log(req.body);

  // Setup rules for validation
  const rules = [
    body('position')
      .trim()
      .notEmpty()
      .withMessage('Position is required'),
    body('company')
      .trim()
      .notEmpty()
      .withMessage('Company is required'),
    body('location')
      .trim()
      .notEmpty()
      .withMessage('Location is required'),
    body('skills')
      .trim()
      .notEmpty()
      .withMessage('Skills are required'),
    body('title')
      .trim()
      .notEmpty()
      .withMessage('Title is required'),
    body('description')
      .trim()
      .notEmpty()
      .withMessage('Description is required'),
    body('openings')
      .isInt({ gt: 0 })
      .withMessage('Openings should be a positive integer'),
    body('expires')
      .isISO8601()
      .toDate()
      .withMessage('Expires should be a valid date'),
    body('isTechnical')
      .custom(value => value === 'true' || value === 'false')
      .withMessage('isTechnical should be a boolean value'),
    body('postedBy')
      .isEmail()
      .withMessage('Posted by should be a valid email'),
    body('postedOn')
      .optional()
      .isISO8601()
      .toDate()
      .withMessage('Posted on should be a valid date'),
    body('id')
      .optional()
      .isInt({ gt: -1 })
      .withMessage('ID should be a positive integer')
  ];

  // Run validation rules
  await Promise.all(rules.map((rule) => rule.run(req)));

  // Check for validation errors
  const validationErrors = validationResult(req);
  console.log(validationErrors);

  // Getting the job from the server
  let jobId = req.params.id
  let jobDetails = JobModel.getJobById(jobId)
  let skills = req.body.skills
  if (skills.includes(',')) {
    skills = skills.split(',')
  } else {
    skills = [skills]
  }
  let updatedJobDetails = { ...jobDetails, ...req.body };
  updatedJobDetails = { ...updatedJobDetails, skills }

  if (!validationErrors.isEmpty()) {
    const errorMessage = validationErrors.array()[0].msg;

    if (req.url.includes('/new')) {
      return res.render('new-job', {
        errorMessage,
        userEmail: req.session.userEmail,
        job: req.body
      });
    } else if (req.url.includes('/update')) {
      return res.render('update-job', {
        errorMessage,
        userEmail: req.session.userEmail,
        job: updatedJobDetails,
      });
    } else {
      return res.status(400).json({ errors: validationErrors.array() });
    }
  }

  next();
};

export default validateRequest;
