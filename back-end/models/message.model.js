// models/Message.js
const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    community: { type: mongoose.Schema.Types.ObjectId, ref: 'community' },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('message', MessageSchema);
// routes/messages.js
const express = require('express');
const router = express.Router();
const Message = require('./message.model');

router.get('/:communityId', async (req, res) => {
    try {
        const messages = await Message.find({ community: req.params.communityId }).populate('sender', 'name');
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
