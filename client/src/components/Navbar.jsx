import { useState } from "react";
import { Link } from "react-router-dom";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";
import UploadWidget from "./UploadWidget";
import navBrand from "../assets/images/desktop_brand.svg";
import "../assets/styles/navbar.css";

import Auth from "../utils/auth";

const Navbar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  return (
    <div>
      <nav>
        <div className="nav-container">
          <div>
            <Link to="/">
              <img src={navBrand} alt="Art Square Logo" />
            </Link>
          </div>
          <div>
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

      {/* {showLoginModal && ( */}
      <div className="nav-right">
        <div>
          <LoginForm
            handleModalClose={() => setShowLoginModal(false)}
            isActive={showLoginModal}
          />
        </div>
      </div>
      {/* )} */}

      {/* {showSignUpModal && ( */}
      <div>
        <div>
          <SignUpForm
            handleModalClose={() => setShowSignUpModal(false)}
            isActive={showSignUpModal}
          />
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default Navbar;
