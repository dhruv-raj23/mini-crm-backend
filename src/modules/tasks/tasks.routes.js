/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management APIs
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create task (ADMIN only)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get tasks (role-based)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 */


const express = require('express');
const router = express.Router();

const tasksController = require('./tasks.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const roleMiddleware = require('../../middlewares/role.middleware');
const {
  createTaskValidation,
  updateTaskStatusValidation
} = require('./tasks.validation');

router.use(authMiddleware);

router.post(
  '/',
  roleMiddleware('ADMIN'),
  createTaskValidation,
  tasksController.createTask
);

router.get('/', tasksController.getTasks);

router.patch(
  '/:id/status',
  updateTaskStatusValidation,
  tasksController.updateTaskStatus
);

module.exports = router;
