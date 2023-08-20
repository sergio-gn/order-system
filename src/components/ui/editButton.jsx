import React, { useState } from "react";

function EditButton({buttonText, onClick}) {
  // const [isEditing, setIsEditing] = useState(false);

  const handleClick = () => {
    // setIsEditing((prevIsEditing) => !prevIsEditing);
    onClick();
  };

  return (
    <button
      // className={`edit-btn ${isEditing ? "edit-btn-green" : ""}`}
      className="edit-btn"
      onClick={handleClick}
    >
      {buttonText}
      {/* {isEditing ? "Ok" : `${buttonText}`} */}
    </button>
  );
}

export default EditButton;