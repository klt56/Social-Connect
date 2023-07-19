import React, { useContext } from 'react';
import { UidContext } from '../components/Routes/AppContext';
import { useSelector } from 'react-redux';
import LeftNav from '../components/LeftNav';
import { isEmpty } from '../components/Routes/Utils';
import Card from '../components/Post/Card';
import Trends from '../components/Trends';
import FriendHint from '../components/Profil/FriendsHint';

const Trending = () => {
 const uid = useContext(UidContext);
 const trendList = useSelector((state) => state.trendingReducer);

    return (
        <div className="trending-page">
         <LeftNav />
         <div calssName="main">
         <ul>
            {!isEmpty(trendList[0]) && trendList.map((post) => <Card post=
            {post} key={post._id} />)}
         </ul>
        </div>
        <div className="right-side">
        <div className="right-side-container">
            <Trends />
            {uid && <FriendHint />}
        </div>
        </div>
        </div>
    );
};

export default Trending;
