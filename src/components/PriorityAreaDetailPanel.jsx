import React from 'react';
import './ImageDetailPanel.css';

export default function PriorityAreaDetailPanel({ area }) {
  const { location, issue, severity, status, coordinates, description } = area;

  return (
    <div className="image-detail">
      <div className="image-detail-grid">
        <div className="image-detail-field">
          <span className="image-detail-label">Location</span>
          <span className="image-detail-value">{location}</span>
        </div>
        <div className="image-detail-field">
          <span className="image-detail-label">Issue</span>
          <span className="image-detail-value">{issue}</span>
        </div>
        <div className="image-detail-field">
          <span className="image-detail-label">Severity</span>
          <span className={`image-detail-status status-severity-${severity.toLowerCase()}`}>{severity}</span>
        </div>
        <div className="image-detail-field">
          <span className="image-detail-label">Status</span>
          <span className="image-detail-value">{status}</span>
        </div>
        <div className="image-detail-field">
          <span className="image-detail-label">Coordinates</span>
          <span className="image-detail-value image-detail-mono">{coordinates}</span>
        </div>
      </div>
      <div className="image-detail-field">
        <span className="image-detail-label">Field Notes</span>
        <p className="image-detail-description">{description}</p>
      </div>
    </div>
  );
}
