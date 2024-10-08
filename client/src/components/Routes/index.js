import React from 'react';
import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Trending from '../../pages/Trending';
import Communaute from '../../pages/communaute';
import Matchmaking from '../../pages/matchmaking';

const index = () => {
    return (
        <Router>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profil" element={<Profil />} />
                <Route path="/trending" element={<Trending />} />
                <Route path="/communaute" element={<Communaute />} />
                <Route path="/matchmaking" element={<Matchmaking />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default index;
