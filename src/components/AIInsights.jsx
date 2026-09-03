import React from 'react';
import './AIInsights.css';

const ICONS = {
  positive: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="8" fill="#E5F2EC" />
      <path d="M4.5 8.2L6.8 10.5L11.5 5.5" stroke="#1E7A5C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  warning: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="8" fill="#FBF1DD" />
      <path d="M8 4.5V8.5" stroke="#B4740E" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="8" cy="11.2" r="0.9" fill="#B4740E" />
    </svg>
  ),
  neutral: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="8" fill="#E7F0F7" />
      <circle cx="8" cy="5.6" r="0.9" fill="#2B6CA3" />
      <path d="M8 7.6V11.4" stroke="#2B6CA3" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
};

export default function AIInsights({ insights }) {
  return (
    <div className="insights-card">
      <div className="insights-card-header">
        <h3 className="insights-card-title">Key Insights</h3>
        <span className="insights-card-tag">AI-generated</span>
      </div>
      <ul className="insights-list">
        {insights.map((insight) => (
          <li key={insight.id} className="insights-item">
            <span className="insights-icon">{ICONS[insight.type]}</span>
            <span className="insights-text">{insight.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
