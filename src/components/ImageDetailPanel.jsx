import React from 'react';
import './ImageDetailPanel.css';

export default function ImageDetailPanel({ image }) {
  const { src, interventionType, location, date, coordinates, status, description } = image;

  return (
    <div className="image-detail">
      <img src={src} alt={interventionType} className="image-detail-photo" />
      <div className="image-detail-grid">
        <div className="image-detail-field">
          <span className="image-detail-label">Intervention Type</span>
          <span className="image-detail-value">{interventionType}</span>
        </div>
        <div className="image-detail-field">
          <span className="image-detail-label">Location</span>
          <span className="image-detail-value">{location}</span>
        </div>
        <div className="image-detail-field">
          <span className="image-detail-label">Date</span>
          <span className="image-detail-value">{date}</span>
        </div>
        <div className="image-detail-field">
          <span className="image-detail-label">Coordinates</span>
          <span className="image-detail-value image-detail-mono">{coordinates}</span>
        </div>
        <div className="image-detail-field">
          <span className="image-detail-label">Status</span>
          <span className={`image-detail-status status-${status.toLowerCase().replace(/\s+/g, '-')}`}>
            {status}
          </span>
        </div>
      </div>
      <div className="image-detail-field">
        <span className="image-detail-label">Description</span>
        <p className="image-detail-description">{description}</p>
      </div>
    </div>
  );
}
