// routes/messages.routes.js
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message.controller');

// Récupérer les messages d'une communauté
router.get('/:communityId', messageController.getMessagesByCommunity);

router.post('/', messageController.createMessage);

router.put('/:messageId', messageController.updateMessage);

router.delete('/:messageId', messageController.deleteMessage);

module.exports = router;
