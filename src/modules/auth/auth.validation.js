const { body } = require('express-validator');

exports.registerValidation = [
  body('name')
    .notEmpty().withMessage('Name is required'),

  body('email')
    .isEmail().withMessage('Valid email is required'),

  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),

  body('role')
    .isIn(['ADMIN', 'EMPLOYEE']).withMessage('Role must be ADMIN or EMPLOYEE')
];

exports.loginValidation = [
  body('email')
    .isEmail().withMessage('Valid email is required'),

  body('password')
    .notEmpty().withMessage('Password is required')
];
