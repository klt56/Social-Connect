// models/community.model.js
const mongoose = require('mongoose');

const CommunitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
});


// routes/communities.js
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const communities = await Community.find();
        res.json(communities);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
router.post('/join/:id', async (req, res) => {
    const userId = req.user.id; // Assuming you have user authentication set up
    try {
        const community = await Community.findById(req.params.id);
        if (!community.members.includes(userId)) {
            community.members.push(userId);
            await community.save();
        }
        res.json({ message: 'Joined community' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
module.exports = mongoose.model('community', CommunitySchema);