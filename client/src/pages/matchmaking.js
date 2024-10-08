import React from 'react';
import Navbar from '../components/Navbar';
import MatchmakingCard from '../components/MatchmakingCard';

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

const Matchmaking = () => {
    return (
        <div className='matchmaking-bloc-principal'>
            <Navbar />
            <h1>Matchmaking</h1>
            <p>Match avec une personne atteinte de ta maladie et discute en privé avec elle !</p>

            <div className="matchmaking-container">

                {communities.map((matchmaking, index) => (
                    <MatchmakingCard
                        key={index}
                        name={matchmaking.name}
                        members={matchmaking.members}
                        maxMembers={matchmaking.maxMembers}
                    />
                ))}
            </div>
        </div>
    );
};

export default Matchmaking;
