import React from "react";
import { Compass } from "./icons.jsx";
import { Link } from "react-router-dom";
import "./EmptyState.css";

export default function EmptyState({
  title = "No archives found",
  description = "No matching records or bookmarks were found in this directory.",
  actionText = "Explore Loreverse",
  actionLink = "/explore",
  icon: Icon = Compass
}) {
  return (
    <div className="empty-state-container">
      <div className="empty-state-icon-box">
        <Icon size={26} />
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-desc">{description}</p>
      {actionText && actionLink && (
        <Link to={actionLink} className="empty-state-action">
          {actionText}
        </Link>
      )}
    </div>
  );
}
