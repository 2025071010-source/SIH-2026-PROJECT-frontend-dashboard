import React from 'react';

export function ImageMarkerPopup({ image, onViewImage }) {
  return (
    <div className="gis-popup">
      <span className="gis-popup-title">{image.interventionType}</span>
      <span className="gis-popup-row"><strong>Village:</strong> {image.location}</span>
      <span className="gis-popup-row"><strong>Date:</strong> {image.date}</span>
      <span className="gis-popup-row"><strong>Lat / Lng:</strong> {image.lat}, {image.lng}</span>
      <span className="gis-popup-row"><strong>Status:</strong> {image.status}</span>
      <button className="gis-popup-button" onClick={() => onViewImage?.(image)}>
        View Image
      </button>
    </div>
  );
}

export function AreaMarkerPopup({ area, onViewDetails }) {
  return (
    <div className="gis-popup">
      <span className="gis-popup-title">{area.location}</span>
      <span className="gis-popup-row"><strong>Issue:</strong> {area.issue}</span>
      <span className="gis-popup-row"><strong>Severity:</strong> {area.severity}</span>
      <span className="gis-popup-row"><strong>Status:</strong> {area.status}</span>
      <button className="gis-popup-button" onClick={() => onViewDetails?.(area)}>
        View Details
      </button>
    </div>
  );
}
