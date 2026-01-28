const { body, param, query } = require('express-validator');

exports.createCustomerValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().withMessage('Phone is required'),
  body('company').optional().isString()
];

exports.updateCustomerValidation = [
  param('id').isInt().withMessage('Customer ID must be a number'),
  body('name').optional().isString(),
  body('email').optional().isEmail(),
  body('phone').optional().isString(),
  body('company').optional().isString()
];

exports.paginationValidation = [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1 }),
  query('search').optional().isString()
];
