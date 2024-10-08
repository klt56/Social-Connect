import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { UidContext } from './Routes/AppContext';
import Logout from './Log/Logout';

const Navbar = () => {
    const uid = useContext(UidContext);
    const userData = useSelector((state) => state.userReducer);

    return (
        <nav>
            <div className="nav-container">
                <div className="logo">
                    <NavLink exact to="/">
                        <img
                            src="./img/power_eco_full_charge_battery_eco_energy_green_energy_icon_252544.png"
                            alt="icon"
                        />
                    </NavLink>
                </div>
                <div className="nav-links">
                    <NavLink to="/" exact activeClassName="active-left-nav">
                        Accueil
                    </NavLink>
                    <NavLink to="/matchmaking" exact activeClassName="active-left-nav">
                        Matchmaking
                    </NavLink>
                    <NavLink to="/communaute" exact activeClassName="active-left-nav">
                        Communautés
                    </NavLink>

                </div>
                {uid ? (
                    <ul>
                        <li className="welcome">
                            <NavLink exact to="/profil">
                                <h5>Bienvenue "{userData.pseudo}"</h5>
                            </NavLink>
                        </li>
                        <li>
                            <Logout />
                        </li>
                    </ul>
                ) : (
                    <ul>
                        <li>
                            <NavLink exact to="/profil">
                                <img src="./img/icons/login.svg" alt="login" />
                            </NavLink>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
