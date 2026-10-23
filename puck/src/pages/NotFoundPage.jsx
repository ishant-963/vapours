import React from "react";
import { Link } from "react-router-dom";
import { Compass } from "../components/common/icons.jsx";
import "./NotFoundPage.css";

export default function NotFoundPage() {
  return (
    <div className="not-found-container">
      <div className="not-found-code">404</div>
      <h1 className="not-found-title">Lost Between Realities</h1>
      <p className="not-found-desc">
        The dimension or article you are searching for does not exist in the Loreverse archives. It may have fallen through a timeline paradox.
      </p>
      <Link to="/" className="not-found-btn">
        <Compass size={16} />
        <span>Return to Prime Archive</span>
      </Link>
    </div>
  );
}
