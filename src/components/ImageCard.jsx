import React from 'react';
import './ImageCard.css';

export default function ImageCard({ image, onViewDetails }) {
  const { interventionType, location, date, src } = image;

  return (
    <div className="image-card">
      <div className="image-card-placeholder">
        <img src={src} alt={interventionType} className="image-card-photo" />
        <span className="image-card-geo-tag">GPS-tagged</span>
      </div>

      <div className="image-card-body">
        <span className="image-card-type">{interventionType}</span>
        <span className="image-card-meta">{location} • {date}</span>
        <button className="image-card-button" onClick={() => onViewDetails?.(image)}>
          View Details
        </button>
      </div>
    </div>
  );
}
