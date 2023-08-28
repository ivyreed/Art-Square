import "../assets/styles/Modal.css";
import PropTypes from "prop-types";

const ModalBg = ({ isActive }) => {
  return (
    <div className={`modal-bg-container ${isActive ? "active" : ""}`}>
      <div className="modal-bg-left">
        <div className={`modal-bg-one ${isActive ? "active" : ""}`}></div>
      </div>
      <div className="modal-bg-right">
        <div className="modal-right-top">
          <div className={`modal-bg-two ${isActive ? "active" : ""}`}></div>
        </div>
        <div className="modal-right-bottom">
          <div className={`modal-bg-three ${isActive ? "active" : ""}`}></div>
        </div>
      </div>
    </div>
  );
};

export default ModalBg;

ModalBg.propTypes = {
  isActive: PropTypes.bool.isRequired,
};
