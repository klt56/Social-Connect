import React from 'react';
import axios from 'axios';
import cookie from "js-cookie";

const Logout = () => {

    const removeCookie = (key) => {
        if (window !== "undefined") {
          cookie.remove(key, { expire: 1})
        }
    };

    const logout = async () => {
        await axios({
            method: 'get',
            url: "http://localhost:5000/api/user/logout",
            withCredentials: true,
        })
        .then(() => removeCookie('jwt'))
        .catch((err) => console.log(err));

        window.location = "/";
    };

    return (
       <li onClick={logout}>
        <img src="./img/icons/logout.svg" alt="logout"/>
       </li>
    );
};

export default Logout;
