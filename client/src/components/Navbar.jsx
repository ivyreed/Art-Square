import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";
import navBrand from "../assets/images/desktop_brand.svg";
import "../assets/styles/navbar.css";

import Auth from "../utils/auth";

const Navbar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const location = useLocation();

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
              <button onClick={Auth.logout}>Logout</button>
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

      {showLoginModal && (
        <div className="nav-right">
          <div>
            <button onClick={() => setShowLoginModal(false)}>Close</button>
            <div>
              <button>Login</button>
              <button>Sign Up</button>
            </div>
          </div>
          <div>
            {location.pathname === "/login" && (
              <LoginForm handleModalClose={() => setShowLoginModal(false)} />
            )}
          </div>
        </div>
      )}

      {showSignUpModal && (
        <div>
          <div>
            <button onClick={() => setShowSignUpModal(false)}>Close</button>
            <div>
              <button>Login</button>
              <button>Sign Up</button>
            </div>
          </div>
          <div>
            {location.pathname === "/signup" && (
              <SignUpForm handleModalClose={() => setShowSignUpModal(false)} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
