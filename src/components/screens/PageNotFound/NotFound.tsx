import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css"; // Import your CSS file for styling
import Button2 from "../Button2/Button2";

function NotFound() {
  const handleClickBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("setting update");
  };
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-heading">Oops!</h1>
        <p className="not-found-text mt-4 mb-4">
          The page you are looking for could not be found.
        </p>
        <Link to="/">
          <Button2 name="Go Back To Home" onClick={handleClickBtn} />
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
