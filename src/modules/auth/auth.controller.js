const { validationResult } = require('express-validator');
const authService = require('./auth.service');

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message || 'Server error'
    });
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const result = await authService.login(req.body);
    res.json(result);
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message || 'Server error'
    });
  }
};
