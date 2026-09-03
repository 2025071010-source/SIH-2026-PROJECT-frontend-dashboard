import React from 'react';
import './MapLegend.css';

const LEGEND_ITEMS = [
  { label: 'Geo-Coded Image / Intervention', color: '#2B6CA3' },
  { label: 'High Severity', color: '#B3261E' },
  { label: 'Medium Severity', color: '#B4740E' },
  { label: 'Low Severity', color: '#1E7A5C' },
];

export default function MapLegend() {
  return (
    <div className="map-legend">
      {LEGEND_ITEMS.map((item) => (
        <div key={item.label} className="map-legend-item">
          <span className="map-legend-dot" style={{ background: item.color }} />
          <span className="map-legend-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
