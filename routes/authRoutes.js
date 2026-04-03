const express = require('express');
const { register, login, getMe } = require('../controllers/authController');

const router = express.Router();

const { protect } = require('../middlewares/authMiddleware');
const { validateAuth } = require('../middlewares/validationMiddleware');

router.post('/register', validateAuth, register);
router.post('/login', validateAuth, login);
router.get('/me', protect, getMe);

module.exports = router;
