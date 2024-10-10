// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { UidContext } from './components/Routes/AppContext';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getUser } from './actions/user.actions';
import Index from './components/Routes'; // Assurez-vous que le chemin est correct

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  // Premier useEffect pour récupérer le token
  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: 'get',
        url: 'http://localhost:5000/jwtid',
        withCredentials: true,
      })
        .then((res) => {
          console.log(res);
          setUid(res.data);
        })
        .catch((err) => console.log('No token', err));
    };
    fetchToken();
  }, []);

  // Deuxième useEffect pour dispatcher getUser lorsque uid change
  useEffect(() => {
    if (uid) {
      dispatch(getUser(uid));
    }
  }, [uid, dispatch]);

  return (
    <UidContext.Provider value={uid}>
      <Index /> {/* Votre composant de routes */}

    </UidContext.Provider>
  );
};

export default App;
