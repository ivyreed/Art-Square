import { useState } from "react";
import "../assets/styles/Forms.css";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import PropTypes from "prop-types";
import ModalBg from "./ModalBg";

const SignupForm = ({ handleModalClose, isActive }) => {
  const [addUser] = useMutation(ADD_USER);
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className={`modal-container ${isActive ? "active" : ""}`}>
      <div className="modal-bg" onClick={handleModalClose}>
        <ModalBg isActive={isActive} />
      </div>
      {showAlert && (
        <div className="validation-alert">
          Something went wrong with your signup!
        </div>
      )}
      <form onSubmit={handleFormSubmit}>
        <div className="input-container">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Your username"
            name="username"
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Your email address"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
        </div>
        <button
          disabled={
            !(
              userFormData.username &&
              userFormData.email &&
              userFormData.password
            )
          }
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignupForm;

SignupForm.propTypes = {
  handleModalClose: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};
