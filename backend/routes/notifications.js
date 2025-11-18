const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const notificationController = require('../controllers/notificationController');

router.get('/', auth, notificationController.getUserNotifications);
router.put('/:id/read', auth, notificationController.markAsRead);

module.exports = router;
