import React from 'react';
import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Trending from '../../pages/Trending';
import Communaute from '../../pages/communaute'; // Assurez-vous que la casse correspond
import Matchmaking from '../../pages/matchmaking';
import Chat from '../../pages/chat';

const Index = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profil" element={<Profil />} />
                <Route path="/trending" element={<Trending />} />
                <Route exact path="/communaute" element={<Communaute />} />
                <Route path="/matchmaking" element={<Matchmaking />} />
                <Route path="/chat/:communityId" element={<Chat />} /> {/* Correction ici */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default Index;
