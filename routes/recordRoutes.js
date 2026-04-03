const express = require('express');
const {
  getSummary,
  getRecords,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecord
} = require('../controllers/recordController');

const router = express.Router();

const { protect, authorize } = require('../middlewares/authMiddleware');
const { validateRecord } = require('../middlewares/validationMiddleware');

// Summary API (Accessible by Analyst and Admin)
router.get('/summary', protect, authorize('Analyst', 'Admin'), getSummary);

// CRUD Endpoints with granular RBAC
router
  .route('/')
  .get(protect, authorize('Viewer', 'Analyst', 'Admin'), getRecords)
  .post(protect, authorize('Admin'), validateRecord, createRecord);

router
  .route('/:id')
  .get(protect, authorize('Viewer', 'Analyst', 'Admin'), getRecord)
  .put(protect, authorize('Admin'), validateRecord, updateRecord)
  .delete(protect, authorize('Admin'), deleteRecord);

module.exports = router;
