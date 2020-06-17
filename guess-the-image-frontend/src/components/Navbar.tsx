import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faBars,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import logo from "../images/logo.png";
import { useDispatch } from "react-redux";
import { logout } from "../actions/auth/actionCreators";
import { axiosInstance } from "../apiCalls/axiosConfig";

const Navbar = () => {
  const dispatch = useDispatch();
  const logoutUser = () => {
    localStorage.removeItem("token");
    axiosInstance.defaults.headers["Authorization"] = undefined;
    dispatch(logout());
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container-md">
          <Link to="/posts" className="navbar-brand">
            <img
              src={logo}
              className="d-inline-block align-top logo"
              alt="Matuly logo"
              loading="lazy"
            />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarToggler"
            aria-controls="navbarToggler"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>

          <div className="collapse navbar-collapse" id="navbarToggler">
            <ul className="navbar-nav ml-lg-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link to="/posts" className="nav-link">
                  Posztok
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/myposts" className="nav-link">
                  Posztjaim
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/new" className="nav-link">
                  Új poszt
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/profile" className="nav-link">
                  <FontAwesomeIcon icon={faUser} />
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" onClick={logoutUser} className="nav-link">
                  <FontAwesomeIcon icon={faSignOutAlt} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
