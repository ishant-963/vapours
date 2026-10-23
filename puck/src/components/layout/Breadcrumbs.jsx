import React from "react";
import { Link } from "react-router-dom";
import "./Breadcrumbs.css";

export default function Breadcrumbs({ items = [] }) {
  if (!items || items.length === 0) return null;

  return (
    <nav className="breadcrumbs-nav" aria-label="Breadcrumbs">
      <ol className="breadcrumbs-list">
        <li className="breadcrumbs-item">
          <Link to="/" className="breadcrumbs-link">Home</Link>
          <span className="breadcrumbs-separator" aria-hidden="true">/</span>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="breadcrumbs-item">
              {isLast || !item.path ? (
                <span className="breadcrumbs-current" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link to={item.path} className="breadcrumbs-link">
                    {item.label}
                  </Link>
                  <span className="breadcrumbs-separator" aria-hidden="true">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
