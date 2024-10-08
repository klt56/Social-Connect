import React from 'react';

const CommunityCard = ({ name, members, maxMembers }) => {
    return (
        <div className="community-card">
            <div className="community-info">
                <p className="community-name">{name}</p>
                <p className="community-members">
                    {members}/{maxMembers}
                </p>
            </div>
            <button className="join-button">Rejoindre</button>
        </div>
    );
};

export default CommunityCard;
