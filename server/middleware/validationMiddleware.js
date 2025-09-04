import { body, param, validationResult } from 'express-validator';
import { BadRequestError } from '../errors/customErrors.js';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js'; // ✅ Import constants

const withValidationErrors = (validateValues) => {
  return [
    ...validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((err) => err.msg);
        throw new BadRequestError(errorMessages.join(', '));
      }
      next();
    },
  ];
};

// ----- body validations -----
export const validateRegisterInput = withValidationErrors([
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
]);

export const validateLoginInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'),
  body('password').notEmpty().withMessage('Password is required'),
]);

export const validateEmailInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'),
]);

export const validateResetPasswordInput = withValidationErrors([
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
]);

// ----- param validations -----
export const validateIdParam = withValidationErrors([
  param('id').isMongoId().withMessage('Invalid MongoDB ID format'),
]);

// ------- job input validations -------
export const validateJobInput = withValidationErrors([
  body('company')
    .notEmpty()
    .withMessage('Company is required')
    .isLength({ max: 100 })
    .withMessage('Company name cannot exceed 100 characters'),

  body('position')
    .notEmpty()
    .withMessage('Position is required')
    .isLength({ max: 100 })
    .withMessage('Position cannot exceed 100 characters'),

  // ✅ CORRECTED to use the imported constant
  body('jobStatus')
    .isIn(Object.values(JOB_STATUS))
    .withMessage('Invalid job status'),

  // ✅ CORRECTED to use the imported constant
  body('jobType')
    .isIn(Object.values(JOB_TYPE))
    .withMessage('Invalid job type'),

  body('jobLocation')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Job location cannot exceed 100 characters'),
]);

// ------ update user input validations -----
export const validateUpdateUserInput = withValidationErrors([
  body('name')
    .optional()
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isLength({ max: 50 })
    .withMessage('Name cannot exceed 50 characters'),

  body('email').optional().isEmail().withMessage('Invalid email format'),

  body('lastName')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Last name cannot exceed 50 characters'),

  body('location')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Location cannot exceed 100 characters'),
]);

