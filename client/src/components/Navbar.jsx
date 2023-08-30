import { useState } from "react";
import { Link } from "react-router-dom";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";

import UploadWidget from "./UploadWidget";
import SearchBar from "./SearchBar";

import Hamburger from "./HamburgerMenu";
import NavBrand from "../assets/images/desktop_brand.svg";
import "../assets/styles/navbar.css";
import ProfileImage from "../assets/images/profile.jpg";

import Auth from "../utils/auth";

const Navbar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [isHamburgerActive, setIsHamburgerActive] = useState(false);

  const toggleMenu = () => {
    setIsHamburgerActive(!isHamburgerActive);
  };

  return (
    <div className="nav-component">
      <nav>
        <div className="nav-container">
          <div className="nav-left">
            <Link to="/">
              <img src={NavBrand} alt="Art Square Logo" />
            </Link>
            <SearchBar />
          </div>

          <div className="nav-right">
            <a href="" className="nav-profile">
              <img src={ProfileImage}></img>
            </a>

            <Hamburger isActive={isHamburgerActive} toggleMenu={toggleMenu} />
            {Auth.loggedIn() ? (
              <div className="button-container">
                <div className="widgetContainer">
                  <UploadWidget />
                </div>
                <button onClick={Auth.logout}>Logout</button>
              </div>
            ) : (
              <div className="button-container">
                <button onClick={() => setShowLoginModal(true)}>Login</button>
                <button onClick={() => setShowSignUpModal(true)}>
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className={`menu-items ${isHamburgerActive ? "active" : ""}`}>
        {Auth.loggedIn() ? (
          <div className="hamburger-items">
            <div className="widgetContainer hamburger-item">
              <UploadWidget />
            </div>
            <button className="hamburger-item" onClick={Auth.logout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="hamburger-items">
            <button
              className="hamburger-item"
              onClick={() => setShowLoginModal(true)}
            >
              Login
            </button>
            <button
              className="hamburger-item"
              onClick={() => setShowSignUpModal(true)}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>

      <LoginForm
        handleModalClose={() => setShowLoginModal(false)}
        isActive={showLoginModal}
      />

      <SignUpForm
        handleModalClose={() => setShowSignUpModal(false)}
        isActive={showSignUpModal}
      />
    </div>
  );
};

export default Navbar;
