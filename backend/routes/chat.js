const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const chatController = require('../controllers/chatController');

router.post('/create', auth, chatController.getOrCreateChat);
router.get('/my', auth, chatController.getUserChats);

module.exports = router;
