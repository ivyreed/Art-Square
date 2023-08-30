// see SignupForm.js for comments
import { useState } from "react";
import "../assets/styles/Forms.css";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import PropTypes from "prop-types";
import ModalBg from "./ModalBg";

const LoginForm = ({ handleModalClose, isActive }) => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [showAlert, setShowAlert] = useState(false);
  const [login] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...userFormData },
      });

      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
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
        <div>Something went wrong with your login credentials!</div>
      )}
      <form onSubmit={handleFormSubmit}>
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Your email"
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
          disabled={!(userFormData.email && userFormData.password)}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

LoginForm.propTypes = {
  handleModalClose: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};
