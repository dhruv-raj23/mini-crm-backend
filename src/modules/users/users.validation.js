const { body, param } = require('express-validator');

exports.updateUserRoleValidation = [
  param('id').isInt().withMessage('User ID must be a number'),
  body('role')
    .isIn(['ADMIN', 'EMPLOYEE'])
    .withMessage('Role must be ADMIN or EMPLOYEE')
];
