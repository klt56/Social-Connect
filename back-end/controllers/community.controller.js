// controllers/community.controller.js
const Community = require("../models/Community.model");

// Créer une nouvelle communauté
module.exports.createCommunity = async (req, res) => {
    const { name } = req.body;

    try {
        const community = new Community({ name, members: [] });
        await community.save();
        res.status(201).json({ message: "Community created successfully", community });
    } catch (err) {
        res.status(400).json({ message: "Error creating community", error: err.message });
    }
};



// Obtenir toutes les communautés
module.exports.getAllCommunities = async (req, res) => {
    try {
        const communities = await Community.find().populate('members');
        res.status(200).json(communities);
    } catch (err) {
        res.status(500).json({ message: "Error fetching communities", error: err.message });
    }
};

// Obtenir une communauté par ID
module.exports.getCommunityById = async (req, res) => {
    try {
        const community = await Community.findById(req.params.id).populate('members');
        if (!community) return res.status(404).json({ message: "Community not found" });
        res.status(200).json(community);
    } catch (err) {
        res.status(500).json({ message: "Error fetching community", error: err.message });
    }
};

// Mettre à jour une communauté
module.exports.updateCommunity = async (req, res) => {
    try {
        const community = await Community.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!community) return res.status(404).json({ message: "Community not found" });
        res.status(200).json({ message: "Community updated successfully", community });
    } catch (err) {
        res.status(400).json({ message: "Error updating community", error: err.message });
    }
};

// Supprimer une communauté
module.exports.deleteCommunity = async (req, res) => {
    try {
        const community = await Community.findByIdAndDelete(req.params.id);
        if (!community) return res.status(404).json({ message: "Community not found" });
        res.status(200).json({ message: "Community deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting community", error: err.message });
    }
};

// Rejoindre une communauté
module.exports.joinCommunity = async (req, res) => {
    const userId = req.params.id;  // Utiliser l'utilisateur authentifié à partir du JWT
    console.log(userId);
    try {
        const community = await Community.findById(req.params.id);

        if (!community) {
            return res.status(404).json({ message: 'Community not found' });
        }

        if (!community.members.includes(userId)) {
            community.members.push(userId);
            await community.save();
            return res.status(200).json({ message: 'Joined community successfully' });
        } else {
            return res.status(400).json({ message: 'User is already a member of this community' });
        }
    } catch (err) {
        return res.status(500).json({ message: 'Error joining community', error: err.message });
    }
};

// Quitter une communauté
module.exports.leaveCommunity = async (req, res) => {
    const userId = req.user.id;

    try {
        const community = await Community.findById(req.params.id);
        if (community.members.includes(userId)) {
            community.members.pull(userId);
            await community.save();
            return res.status(200).json({ message: "Left community successfully" });
        } else {
            return res.status(400).json({ message: "User is not a member of this community" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error leaving community", error: err.message });
    }
};
