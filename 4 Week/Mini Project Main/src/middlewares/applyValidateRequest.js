import { body, validationResult } from 'express-validator';
import { JobModel } from '../models/job.model.js';

const applyValidateRequest = async (req, res, next) => {
    // Define validation rules
    const rules = [
        body('name').trim().notEmpty().withMessage('Error : Name is required'),
        body('email').trim().notEmpty().isEmail().withMessage('Error : Email is required'),
        body('mobile').trim().notEmpty().isMobilePhone().withMessage('Error : Enter Valid Mobile Number'),
        body('yearOfGraduation').trim().isNumeric().withMessage('Error : Year of Graduation should be a number'),
        body('cgpa').trim().isFloat({ min: 0, max: 10 }).withMessage('Error : CGPA should be a number between 0 and 10'),
    ];

    // Execute validation rules
    await Promise.all(rules.map(validation => validation.run(req)));

    // Extract validation errors from request
    const errors = validationResult(req);
    console.log(errors);

    let jobId = req.params.id
    let jobDetails = JobModel.getJobById(jobId)

    // If there are validation errors, respond with a 400 status and the errors
    if (!errors.isEmpty()) {
        const errorMessage = errors.array()[0].msg;
        return res.render('apply', {
            errorMessage,
            job: jobDetails,
            user: req.body,
        })
    }

    // If validation succeeds, proceed to the next middleware or route handler
    next();
};

export default applyValidateRequest;
