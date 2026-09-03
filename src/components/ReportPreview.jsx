import React from 'react';
import AIInsights from './AIInsights';
import './ReportPreview.css';
import { buildReportText, downloadTextFile } from '../utils/downloadReport';

export default function ReportPreview({ report, watershed, data }) {
  const { summary, priorityAreas, insights } = data;

  const handleDownload = () => {
    const text = buildReportText(report, watershed, data);
    const filename = `${report.name.replace(/\s+/g, '_')}.txt`;
    downloadTextFile(filename, text);
  };

  return (
    <div className="report-preview">
      <div className="report-preview-meta">
        <span><strong>Watershed:</strong> {watershed.name}</span>
        <span><strong>Date:</strong> {report.date}</span>
        <span><strong>Status:</strong> {report.status}</span>
      </div>

      <div className="report-preview-metrics">
        <div className="report-metric">
          <span className="report-metric-label">Watershed Health Score</span>
          <span className="report-metric-value">{summary.healthScore.value}/{summary.healthScore.max}</span>
        </div>
        <div className="report-metric">
          <span className="report-metric-label">Vegetation Change</span>
          <span className="report-metric-value">{summary.vegetationChange.value > 0 ? '+' : ''}{summary.vegetationChange.value}{summary.vegetationChange.unit}</span>
        </div>
        <div className="report-metric">
          <span className="report-metric-label">Water Availability</span>
          <span className="report-metric-value">{summary.waterAvailability.value > 0 ? '+' : ''}{summary.waterAvailability.value}{summary.waterAvailability.unit}</span>
        </div>
        <div className="report-metric">
          <span className="report-metric-label">Interventions Monitored</span>
          <span className="report-metric-value">{summary.interventionsMonitored.value}</span>
        </div>
      </div>

      <div className="report-preview-section">
        <h4 className="report-preview-heading">Priority Areas</h4>
        <ul className="report-priority-list">
          {priorityAreas.map((area) => (
            <li key={area.id}>
              <strong>{area.location}</strong> — {area.issue} <span className="report-priority-tag">{area.severity}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="report-preview-section">
        <AIInsights insights={insights} />
      </div>

      <button className="report-download-button" onClick={handleDownload}>
        Download Report
      </button>
    </div>
  );
}
