import React, { useState } from "react";

function EditButton({ buttonText, onClick }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleClick = () => {
    if (!isButtonDisabled) {
      setIsEditing((prevIsEditing) => !prevIsEditing);
      onClick();
      setIsButtonDisabled(true); // Disable the button after clicking
    }
  };

  return (
    <button
      className={`edit-btn ${isEditing ? "edit-btn-green" : ""}`}
      onClick={handleClick}
      disabled={isButtonDisabled} // Disable the button when isButtonDisabled is true
    >
      {isEditing ? "Ok" : `${buttonText}`}
    </button>
  );
}

export default EditButton;