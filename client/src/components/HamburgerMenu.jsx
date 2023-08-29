import "../assets/styles/HamburgerMenu.css";
import PropTypes from "prop-types";
import { useState } from "react";

const HamburgerMenu = ({ toggleMenu }) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
    toggleMenu();
  };

  return (
    <div
      className={`hamburger ${active ? "active" : ""}`}
      onClick={handleClick}
    >
      <span className="line line1"></span>
      <span className="line line2"></span>
      <span className="line line3"></span>
    </div>
  );
};

export default HamburgerMenu;

HamburgerMenu.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
  // isHamburgerActive: PropTypes.bool.isRequired,
};
