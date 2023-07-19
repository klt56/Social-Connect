import React, { useState, useEffect } from 'react';
import Routes from "./components/Routes";
import { UidContext } from "./components/Routes/AppContext";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getUser } from './actions/user.actions';

const App = () => {
  const [uid,setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() =>{
    const fetchToken = async() => {
     await axios({
      method: "get",
      url: 'http://localhost:5000/jwtid',
      withCredentials: true,
     })
     .then((res) => {
      console.log(res);
      setUid(res.data);
     })
     .catch((err) => console.log("no token"));
    };
    fetchToken();

    if (uid) dispatch(getUser(uid))
    }, [uid, dispatch]);

    return (
      <UidContext.Provider value={uid}>
       <Routes />
      </UidContext.Provider>
    );
};

export default App;
