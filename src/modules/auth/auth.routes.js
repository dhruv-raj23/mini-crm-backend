/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: User registered successfully
 */


const express = require('express');
const router = express.Router();

const authController = require('./auth.controller');
const {
  registerValidation,
  loginValidation
} = require('./auth.validation');

router.post('/register', registerValidation, authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user and get JWT token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Login successful
 */

router.post('/login', loginValidation, authController.login);

module.exports = router;
