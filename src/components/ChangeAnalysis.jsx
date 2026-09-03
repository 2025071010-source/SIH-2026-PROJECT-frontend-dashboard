import React from 'react';
import './ChangeAnalysis.css';

function ImagePlaceholder({ label, date, src }) {
  return (
    <div className="change-image">
      <div className="change-image-placeholder">
        <img src={src} alt={label} className="change-image-photo" />
      </div>
      <div className="change-image-caption">
        <span className="change-image-label">{label}</span>
        <span className="change-image-date">{date}</span>
      </div>
    </div>
  );
}

function StatRow({ label, before, after, unit }) {
  return (
    <div className="change-stat-row">
      <span className="change-stat-label">{label}</span>
      <div className="change-stat-values">
        <span className="change-stat-before">{before}{unit}</span>
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true">
          <path d="M1 5H14M14 5L10 1M14 5L10 9" stroke="#8B978F" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="change-stat-after">{after}{unit}</span>
      </div>
    </div>
  );
}

export default function ChangeAnalysis({ data }) {
  const { beforeImage, afterImage, stats, overallChange } = data;

  return (
    <div className="change-card">
      <div className="change-card-header">
        <h3 className="change-card-title">Watershed Change Analysis</h3>
        <p className="chart-card-subtitle">Before vs after intervention comparison</p>
      </div>

      <div className="change-card-body">
        <div className="change-images">
          <ImagePlaceholder label={beforeImage.label} date={beforeImage.date} src={beforeImage.src} />
          <ImagePlaceholder label={afterImage.label} date={afterImage.date} src={afterImage.src} />
        </div>

        <div className="change-stats">
          {stats.map((stat) => (
            <StatRow key={stat.label} {...stat} />
          ))}
          <div className="change-overall">
            <span>Overall Change</span>
            <span className="change-overall-value">+{overallChange}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
