const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile, updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/api/auth/register', registerUser);
router.post('/api/auth/login', loginUser);
router.get('/api/auth/profile', protect, getProfile);
router.put('/api/auth/profile', protect, updateProfile);

module.exports = router;
