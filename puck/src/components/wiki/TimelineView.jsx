import React from "react";
import "./TimelineView.css";

export default function TimelineView({ events = [] }) {
  if (!events || events.length === 0) return null;

  return (
    <div className="timeline-container" aria-label="Chronological Lore Timeline">
      {events.map((ev, index) => (
        <div key={index} className="timeline-event">
          <div className="timeline-dot" aria-hidden="true" />
          <div className="timeline-year">{ev.year}</div>
          <div className="timeline-title">{ev.event}</div>
          {ev.details && <p className="timeline-desc">{ev.details}</p>}
        </div>
      ))}
    </div>
  );
}
