import { useState } from "react";
import styles from "../assets/styles/Modal.css";

const ModalBg = () => {
  const [isActive, setIsActive] = useState({
    squareOne: false,
    squareTwo: false,
    squareThree: false,
    modalContainer: false,
  });

  const handlePageClick = () => {
    setIsActive((prevState) => ({
      squareOne: !prevState.squareOne,
      squareTwo: !prevState.squareTwo,
      squareThree: !prevState.squareThree,
      modalContainer: !prevState.modalContainer,
    }));
  };

  return (
    <div className={styles.page} onClick={handlePageClick}>
      <div
        className={
          isActive.modalContainer
            ? `${styles["modal-container"]} ${styles["modal-container-active"]}`
            : styles["modal-container"]
        }
      >
        <div className={styles["modal-bg-left"]}>
          <div
            className={
              isActive.squareOne
                ? `${styles["modal-bg-one"]} ${styles.activeOne}`
                : styles["modal-bg-one"]
            }
          ></div>
        </div>
        <div className={styles["modal-bg-right"]}>
          <div className={styles["modal-right-top"]}>
            <div
              className={
                isActive.squareTwo
                  ? `${styles["modal-bg-two"]} ${styles.activeTwo}`
                  : styles["modal-bg-two"]
              }
            ></div>
          </div>
          <div className={styles["modal-right-bottom"]}>
            <div
              className={
                isActive.squareThree
                  ? `${styles["modal-bg-three"]} ${styles.activeThree}`
                  : styles["modal-bg-three"]
              }
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalBg;
