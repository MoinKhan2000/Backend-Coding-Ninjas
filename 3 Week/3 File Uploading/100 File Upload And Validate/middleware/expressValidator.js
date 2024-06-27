import { body, check, validationResult } from "express-validator"; // Import the necessary modules

export const formValidation = async (req, res, next) => {
  // 1. Setup rules for validation.
  const rules = [
    body('name')
      .notEmpty()
      .withMessage('Name is required'),
    body('email')
      .isEmail()
      .withMessage('Enter a valid email'),
    body('image').custom((value, { req }) => {
      if (!req.file) {
        throw new Error('Profile image is required');
      }
      return true;
    }),
  ];

  // 2. Run those rules.
  await Promise.all(rules.map((rule) => rule.run(req)));

  // 3. Check if there are any errors after running the rules.
  const validationErrors = validationResult(req);
  console.log(validationErrors);
  const { name, email } = req.body;
  // 4. If errors, return the error message
  if (!validationErrors.isEmpty()) {
    return res.render('upload-form.ejs', {
      errorMessage: validationErrors.array()[0].msg,
      user: { name, email }
    },
    );
  }

  next();
};
