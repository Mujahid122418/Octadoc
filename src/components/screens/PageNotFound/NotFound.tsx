import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css"; // Import your CSS file for styling
import Button2 from "../Button2/Button2";
import { useNavigate } from "react-router-dom";
function NotFound() {
  const navigate = useNavigate(); // Use useNavigate hook to access navigation
  const handleClickBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate("/");
  };
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-heading">Oops!</h1>
        <p className="not-found-text mt-4 mb-4">
          The page you are looking for could not be found.
        </p>

        <Button2 name="Go Back To Home" onClick={handleClickBtn} />
      </div>
    </div>
  );
}

export default NotFound;
