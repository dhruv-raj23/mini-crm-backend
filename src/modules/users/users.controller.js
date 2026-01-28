const { validationResult } = require('express-validator');
const usersService = require('./users.service');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await usersService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await usersService.getUserById(Number(req.params.id));
    res.json(user);
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

exports.updateUserRole = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedUser = await usersService.updateUserRole(
      Number(req.params.id),
      req.body.role
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};
