const { validationResult } = require('express-validator');
const customerService = require('./customers.service');

exports.createCustomer = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const customer = await customerService.createCustomer(req.body);
    res.status(201).json(customer);
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

exports.getCustomers = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = req.query.search || '';

  try {
    const result = await customerService.getCustomers(page, limit, search);
    res.json(result);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getCustomerById = async (req, res) => {
  try {
    const customer = await customerService.getCustomerById(Number(req.params.id));
    res.json(customer);
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const customer = await customerService.updateCustomer(
      Number(req.params.id),
      req.body
    );
    res.json(customer);
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    await customerService.deleteCustomer(Number(req.params.id));
    res.status(204).send();
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};
