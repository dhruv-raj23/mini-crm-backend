/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Admin-only user management
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users (ADMIN only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */


const express = require('express');
const router = express.Router();

const usersController = require('./users.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const roleMiddleware = require('../../middlewares/role.middleware');
const { updateUserRoleValidation } = require('./users.validation');

router.use(authMiddleware);
router.use(roleMiddleware('ADMIN'));

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Update user role (ADMIN only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */

router.patch('/:id', updateUserRoleValidation, usersController.updateUserRole);

module.exports = router;
