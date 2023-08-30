import { useState } from "react";
import { Link } from "react-router-dom";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";
import UploadWidget from "./uploadWidget";
import Hamburger from "./HamburgerMenu";
import navBrand from "../assets/images/desktop_brand.svg";
import "../assets/styles/navbar.css";

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
          <div>
            <Link to="/">
              <img src={navBrand} alt="Art Square Logo" />
            </Link>
          </div>

          <div>
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
        <button onClick={() => setShowLoginModal(true)}>Login</button>
        <button onClick={() => setShowSignUpModal(true)}>Sign Up</button>
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
