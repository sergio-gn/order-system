import React, { useEffect } from "react";

const Modal = ({ isOpen, setIsOpen }) => {
  useEffect(() => {
    let bodyOverflowStyle;
    let htmlOverflowStyle;
    console.log("modal useEffect")
    if (isOpen) {
      // Store the original overflow styles
      bodyOverflowStyle = document.body.style.overflow;
      htmlOverflowStyle = document.documentElement.style.overflow;
      // Set overflow to hidden when the modal is open
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }
    // This effect cleanup function runs when the component unmounts or when the modal is closed
    return () => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
      }
    };
  }, [isOpen]);

  return (
    <>
      <div className="darkBG" onClick={() => setIsOpen(false)} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">Dialog</h5>
          </div>
          <button className="closeBtn" onClick={() => setIsOpen(false)}>
            x
          </button>
          <div className="modalContent">
            Quantidade:
          </div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button className="deleteBtn" onClick={() => setIsOpen(false)}>
                Delete
              </button>
              <button className="cancelBtn" onClick={() => setIsOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;