import React from 'react';
import './SummaryCard.css';

function TrendBadge({ direction, label }) {
  if (!label) return null;
  const arrow = direction === 'up' ? '↑' : direction === 'down' ? '↓' : '→';
  return (
    <span className={`summary-trend summary-trend-${direction}`}>
      {arrow} {label}
    </span>
  );
}

function HealthRing({ value, max }) {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(value / max, 1);
  const dashOffset = circumference * (1 - progress);

  return (
    <svg width="64" height="64" viewBox="0 0 64 64" className="summary-ring">
      <circle cx="32" cy="32" r={radius} fill="none" stroke="var(--color-border)" strokeWidth="6" />
      <circle
        cx="32"
        cy="32"
        r={radius}
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
        transform="rotate(-90 32 32)"
      />
      <text x="32" y="36" textAnchor="middle" className="summary-ring-text">
        {value}
      </text>
    </svg>
  );
}

/**
 * icon: small inline SVG node
 * variant: 'ring' renders a circular progress gauge instead of the icon tile
 */
export default function SummaryCard({
  title,
  value,
  unit,
  max,
  trendLabel,
  trendDirection,
  icon,
  variant = 'default',
}) {
  return (
    <div className="summary-card">
      <div className="summary-card-top">
        <span className="summary-card-title">{title}</span>
        {variant !== 'ring' && icon && <span className="summary-card-icon">{icon}</span>}
      </div>

      {variant === 'ring' ? (
        <div className="summary-card-ring-row">
          <HealthRing value={value} max={max} />
          <div className="summary-card-ring-caption">
            <span className="summary-value">
              {value}
              <span className="summary-value-max">/{max}</span>
            </span>
            <TrendBadge direction={trendDirection} label={trendLabel} />
          </div>
        </div>
      ) : (
        <>
          <div className="summary-value">
            {value}
            {unit}
          </div>
          <TrendBadge direction={trendDirection} label={trendLabel} />
        </>
      )}
    </div>
  );
}
