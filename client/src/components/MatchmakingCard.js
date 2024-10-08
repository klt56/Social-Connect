import React from 'react';

const MatchmakingCard = ({ name }) => {
    return (
        <div className="community-card">
            <div className="community-info">
                <p className="community-name">{name}</p>
            </div>
            <button className="join-button">Matcher</button>
        </div>
    );
};

export default MatchmakingCard;
