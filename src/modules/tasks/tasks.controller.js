const { validationResult } = require('express-validator');
const taskService = require('./tasks.service');

exports.createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const task = await taskService.createTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getTasks(req.user);
    res.json(tasks);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateTaskStatus = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const task = await taskService.updateTaskStatus(
      Number(req.params.id),
      req.body.status,
      req.user
    );
    res.json(task);
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};
