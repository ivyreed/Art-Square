// see SignupForm.js for comments
import { useState } from "react";
// import { Form, Button, Alert } from "react-bootstrap";
import "../assets/styles/forms.css";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import PropTypes from "prop-types";

// const LoginForm = () => {
//   const [userFormData, setUserFormData] = useState({ email: "", password: "" });
//   const [validated] = useState(false);
//   const [showAlert, setShowAlert] = useState(false);
//   const [login] = useMutation(LOGIN_USER);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setUserFormData({ ...userFormData, [name]: value });
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     // check if form has everything (as per react-bootstrap docs)
//     const form = event.currentTarget;
//     if (form.checkValidity() === false) {
//       event.preventDefault();
//       event.stopPropagation();
//     }

//     try {
//       console.log(userFormData);
//       const { data } = await login({
//         variables: { ...userFormData },
//       });

//       console.log(data);
//       Auth.login(data.login.token);
//     } catch (err) {
//       console.error(err);
//       setShowAlert(true);
//     }

//     setUserFormData({
//       username: "",
//       email: "",
//       password: "",
//     });
//   };

//   return (
//     <>
//       <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
//         <Alert
//           dismissible
//           onClose={() => setShowAlert(false)}
//           show={showAlert}
//           variant="danger"
//         >
//           Something went wrong with your login credentials!
//         </Alert>
//         <Form.Group className="mb-3">
//           <Form.Label htmlFor="email">Email</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Your email"
//             name="email"
//             onChange={handleInputChange}
//             value={userFormData.email}
//             required
//           />
//           <Form.Control.Feedback type="invalid">
//             Email is required!
//           </Form.Control.Feedback>
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label htmlFor="password">Password</Form.Label>
//           <Form.Control
//             type="password"
//             placeholder="Your password"
//             name="password"
//             onChange={handleInputChange}
//             value={userFormData.password}
//             required
//           />
//           <Form.Control.Feedback type="invalid">
//             Password is required!
//           </Form.Control.Feedback>
//         </Form.Group>
//         <Button
//           disabled={!(userFormData.email && userFormData.password)}
//           type="submit"
//           variant="success"
//         >
//           Submit
//         </Button>
//       </Form>
//     </>
//   );
// };

// export default LoginForm;

const LoginForm = ({ handleModalClose }) => {
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
    <div className="modal-container">
      <div className="modal-bg" onClick={handleModalClose}></div>
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
};
