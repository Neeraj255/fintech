const Task = require('../models/Task');

/**
 * @desc    Create a new task
 */
exports.createTask = async (taskData, userId) => {
  return await Task.create({ ...taskData, user: userId });
};

/**
 * @desc    Get all tasks with pagination and search
 */
exports.getTasks = async (userId, query) => {
  const { page = 1, limit = 10, q, status } = query;

  const mongoQuery = { user: userId, isDeleted: false };
  
  if (q) {
    mongoQuery.$text = { $search: q };
  }

  if (status) {
    mongoQuery.status = status;
  }

  const tasks = await Task.find(mongoQuery)
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .sort({ createdAt: -1 });

  const total = await Task.countDocuments(mongoQuery);

  return {
    tasks,
    pagination: {
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit)
    }
  };
};

/**
 * @desc    Get single task
 */
exports.getTaskById = async (id, userId) => {
  const task = await Task.findOne({ _id: id, user: userId, isDeleted: false });
  if (!task) {
    throw new Error('Task not found or you are not authorized');
  }
  return task;
};

/**
 * @desc    Update task
 */
exports.updateTask = async (id, userId, updateData) => {
  let task = await Task.findOne({ _id: id, user: userId, isDeleted: false });
  
  if (!task) {
    throw new Error('Task not found or you are not authorized');
  }

  task = await Task.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  });

  return task;
};

/**
 * @desc    Soft delete task
 */
exports.deleteTask = async (id, userId) => {
  const task = await Task.findOne({ _id: id, user: userId, isDeleted: false });

  if (!task) {
    throw new Error('Task not found or you are not authorized');
  }

  task.isDeleted = true;
  await task.save();
  return task;
};
