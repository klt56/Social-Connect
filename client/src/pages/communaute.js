// Communaute.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import CommunityCard from '../components/CommunityCard';

const Communaute = () => {
    const [communities, setCommunities] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/community')
            .then((response) => setCommunities(response.data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div className='community-bloc-principal'>
            <Navbar />
            <h1>Communautés</h1>
            <p>Rejoins les communautés pour discuter avec les gens atteints de ta maladie !</p>

            <div className="community-container">
                {communities.map((community) => (
                    <CommunityCard
                        key={community._id}
                        communityId={community._id}  // <-- Passer l'ID de la communauté ici
                        name={community.name}
                        members={community.members.length}
                        maxMembers={community.maxMembers}
                    />
                ))}
            </div>
        </div>
    );
};

export default Communaute;
