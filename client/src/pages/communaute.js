import React from 'react';
import Navbar from '../components/Navbar';
import CommunityCard from '../components/CommunityCard';

const communities = [
    { name: 'Sida', members: 18, maxMembers: 200 },
    { name: 'Cancer', members: 74, maxMembers: 150 },
    { name: 'Grippe', members: 28, maxMembers: 180 },
    { name: 'Sida', members: 18, maxMembers: 200 },
    { name: 'Cancer', members: 74, maxMembers: 150 },
    { name: 'Grippe', members: 28, maxMembers: 180 },
    { name: 'Sida', members: 18, maxMembers: 200 },
    { name: 'Cancer', members: 74, maxMembers: 150 },
    { name: 'Grippe', members: 28, maxMembers: 180 },
    { name: 'Sida', members: 18, maxMembers: 200 },
    { name: 'Cancer', members: 74, maxMembers: 150 },
    { name: 'Grippe', members: 28, maxMembers: 180 },
];

const Communaute = () => {
    return (
        <div className='community-bloc-principal'>
            <Navbar />
            <h1>Communautés</h1>
            <p>Rejoins les communautés pour discuter avec les gens atteint de ta maladie !</p>

            <div className="community-container">

                {communities.map((community, index) => (
                    <CommunityCard
                        key={index}
                        name={community.name}
                        members={community.members}
                        maxMembers={community.maxMembers}
                    />
                ))}
            </div>
        </div>
    );
};

export default Communaute;
