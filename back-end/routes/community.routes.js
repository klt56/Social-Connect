// routes/communities.routes.js
const express = require('express');
const router = express.Router();
const communityController = require('../controllers/community.controller');
const { requireAuth } = require('../middleware/auth.middleware');  // Import du middleware requireAuth

// Routes sécurisées avec le middleware requireAuth
router.get('/', communityController.getAllCommunities);
router.post('/', communityController.createCommunity);
router.get('/:id', communityController.getCommunityById);
router.put('/:id', communityController.updateCommunity);
router.delete('/:id', communityController.deleteCommunity);
router.patch('/join/:id', communityController.joinCommunity);
router.patch('/leave/:id', communityController.leaveCommunity);

module.exports = router;
