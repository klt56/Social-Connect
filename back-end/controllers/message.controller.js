// controllers/message.controller.js
const Message = require('../models/message.model');
const Community = require('../models/Community.model');
const User = require('../models/user.model');
const mongoose = require('mongoose');

// Obtenir tous les messages d'une communauté
module.exports.getMessagesByCommunity = async (req, res) => {
    try {
        const messages = await Message.find({ community: req.params.communityId })
            .populate('sender', 'name')  // Récupère les informations de l'expéditeur
            .sort({ timestamp: 1 });  // Trier les messages par date croissante

        if (!messages || messages.length === 0) {
            return res.status(404).json({ message: 'No messages found for this community' });
        }

        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Créer un nouveau message dans une communauté
// Créer un nouveau message dans une communauté
module.exports.createMessage = async (req, res) => {
    const { community, content, sender } = req.body;

    try {
        // Vérification si la communauté existe
        const communityExists = await Community.findById(community);
        if (!communityExists) {
            return res.status(404).json({ message: 'Community not found' });
        }

        // Vérification si l'utilisateur existe
        const userExists = await User.findById(sender);
        if (!userExists) {
            return res.status(404).json({ message: 'Sender not found' });
        }

        console.log('Creating new message...');
        // Créer un nouveau message
        const newMessage = new Message({
            sender,
            community,
            content,
        });

        console.log('Saving new message...');
        await newMessage.save();

        console.log('Message saved successfully.');

        // Renvoyer les messages après la création du message
        const messages = await Message.find({ community })
            .populate('sender', 'name')
            .sort({ timestamp: 1 });

        res.status(201).json({ message: 'Message sent successfully', messages });
    } catch (err) {
        console.error('Error in createMessage:', err);
        res.status(500).json({ message: 'Failed to send message', error: err.message });
    }
};




// Mettre à jour un message
module.exports.updateMessage = async (req, res) => {
    const { messageId, content } = req.body;

    try {
        const message = await Message.findOne({ _id: messageId, sender: req.user.id });
        if (!message) {
            return res.status(404).json({ message: 'Message not found or unauthorized' });
        }

        message.content = content;
        await message.save();

        res.status(200).json({ message: 'Message updated successfully', message });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update message', error: err.message });
    }
};

// Supprimer un message
module.exports.deleteMessage = async (req, res) => {
    const { messageId } = req.params;

    try {
        const message = await Message.findOne({ _id: messageId, sender: req.user.id });
        if (!message) {
            return res.status(404).json({ message: 'Message not found or unauthorized' });
        }

        await Message.findByIdAndDelete(messageId);

        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete message', error: err.message });
    }
};
