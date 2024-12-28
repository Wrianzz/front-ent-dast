import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div id="error-pages">
        <div className="error-page">
          <h1>404 Not Found</h1>
          <p>Uh-oh! The page you are looking for does not exist. How about we go home?</p>
          <button className="error-back-button" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
    </div>
  );
};

export default NotFound;
