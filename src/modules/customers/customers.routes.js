/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Customer management APIs
 */

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Create customer (ADMIN only)
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get customers with pagination
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 */


const express = require('express');
const router = express.Router();

const customersController = require('./customers.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const roleMiddleware = require('../../middlewares/role.middleware');
const {
  createCustomerValidation,
  updateCustomerValidation
} = require('./customers.validation');

router.use(authMiddleware);

router.post('/', roleMiddleware('ADMIN'), createCustomerValidation, customersController.createCustomer);
router.get('/', customersController.getCustomers);
router.get('/:id', customersController.getCustomerById);
router.patch('/:id', roleMiddleware('ADMIN'), updateCustomerValidation, customersController.updateCustomer);
router.delete('/:id', roleMiddleware('ADMIN'), customersController.deleteCustomer);

module.exports = router;
