const taskService = require('../services/taskService');

/**
 * @desc    Get all tasks
 * @route   GET /api/tasks
 * @access  Private
 */
exports.getTasks = async (req, res, next) => {
  try {
    const data = await taskService.getTasks(req.user.id, req.query);
    res.status(200).json({
      success: true,
      count: data.tasks.length,
      pagination: data.pagination,
      data: data.tasks
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get single task
 * @route   GET /api/tasks/:id
 * @access  Private
 */
exports.getTask = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.params.id, req.user.id);
    res.status(200).json({
      success: true,
      data: task
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Create task
 * @route   POST /api/tasks
 * @access  Private
 */
exports.createTask = async (req, res, next) => {
  try {
    const task = await taskService.createTask(req.body, req.user.id);
    res.status(201).json({
      success: true,
      data: task
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Update task
 * @route   PUT /api/tasks/:id
 * @access  Private
 */
exports.updateTask = async (req, res, next) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.user.id, req.body);
    res.status(200).json({
      success: true,
      data: task
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Delete task (soft)
 * @route   DELETE /api/tasks/:id
 * @access  Private
 */
exports.deleteTask = async (req, res, next) => {
  try {
    await taskService.deleteTask(req.params.id, req.user.id);
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};
