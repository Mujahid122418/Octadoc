import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css"; // Import your CSS file for styling

function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-heading">Oops!</h1>
        <p className="not-found-text">
          The page you are looking for could not be found.
        </p>
        <Link to="/" className="not-found-link">
          Go back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
