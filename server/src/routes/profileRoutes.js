const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const profileController = require('../controllers/profileController');

router.get('/', authMiddleware, profileController.getProfile);
router.put('/', authMiddleware, profileController.updateProfile);
router.post('/avatar', authMiddleware, profileController.uploadAvatar);
router.delete('/avatar', authMiddleware, profileController.deleteAvatar);

module.exports = router;
