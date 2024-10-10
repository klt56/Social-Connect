import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CommunityCard = ({ name, members, maxMembers, communityId }) => {
    const navigate = useNavigate();
    const joinCommunity = () => {
        axios({
            method: "patch",
            url: `http://localhost:5000/api/community/join/${communityId}`
        })

            .then((response) => {
                console.log(response.data.message);
                navigate(`/chat/${communityId}`);
            })
            .catch((error) => console.error(error));
    };

    return (
        <div className="community-card">
            <h4>{name}</h4>
            <p>{maxMembers} membres</p>
            <button onClick={joinCommunity}>Rejoindre</button>
        </div>
    );
};

export default CommunityCard;
