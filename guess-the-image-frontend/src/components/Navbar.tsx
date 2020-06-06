import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faBars } from '@fortawesome/free-solid-svg-icons';

import logo from '../images/logo.png';

const Navbar = () => {

    return <header>
        <nav className="navbar navbar-expand-lg">
            <div className="container-md">
                <a className="navbar-brand" href="#">
                    <img src={logo} className="d-inline-block align-top logo" alt="" loading="lazy" />
                </a>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                    <FontAwesomeIcon icon={faBars} />
                </button>


                <div className="collapse navbar-collapse" id="navbarToggler">
                    <ul className="navbar-nav ml-lg-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Posztok</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Archívum</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Új poszt</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Profil</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <FontAwesomeIcon icon={faSignOutAlt} />
                            </a>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>

    </header>
}

export default Navbar;