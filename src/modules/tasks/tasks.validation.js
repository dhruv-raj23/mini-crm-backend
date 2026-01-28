const { body, param } = require('express-validator');

exports.createTaskValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('assignedTo').isInt().withMessage('assignedTo must be a user ID'),
  body('customerId').isInt().withMessage('customerId must be a customer ID'),
  body('status')
    .optional()
    .isIn(['PENDING', 'IN_PROGRESS', 'DONE'])
];

exports.updateTaskStatusValidation = [
  param('id').isInt().withMessage('Task ID must be a number'),
  body('status')
    .isIn(['PENDING', 'IN_PROGRESS', 'DONE'])
    .withMessage('Invalid task status')
];
