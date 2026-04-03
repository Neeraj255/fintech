const express = require('express');
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

const router = express.Router();

const { protect } = require('../middlewares/authMiddleware');
const { validateTask } = require('../middlewares/validationMiddleware');

// Re-route into other resource routers (if any)
// router.use('/:taskId/items', itemRouter);

router
  .route('/')
  .get(protect, getTasks)
  .post(protect, validateTask, createTask);

router
  .route('/:id')
  .get(protect, getTask)
  .put(protect, validateTask, updateTask)
  .delete(protect, deleteTask);

module.exports = router;
