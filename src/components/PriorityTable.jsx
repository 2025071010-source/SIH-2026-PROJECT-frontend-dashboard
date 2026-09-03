import React from 'react';
import './PriorityTable.css';

function SeverityBadge({ severity }) {
  const className = `severity-badge severity-${severity.toLowerCase()}`;
  return <span className={className}>{severity}</span>;
}

function StatusBadge({ status }) {
  const isAction = status === 'Needs Inspection';
  return (
    <span className={`status-badge ${isAction ? 'status-action' : 'status-monitor'}`}>
      {status}
    </span>
  );
}

export default function PriorityTable({ areas, onRowClick }) {
  return (
    <div className="priority-card">
      <div className="priority-card-header">
        <h3 className="priority-card-title">Priority Areas</h3>
        <p className="chart-card-subtitle">Locations flagged for review this cycle</p>
      </div>

      <div className="priority-table-wrap">
        <table className="priority-table">
          <thead>
            <tr>
              <th>Location</th>
              <th>Issue</th>
              <th>Severity</th>
              <th>Status</th>
              <th aria-hidden="true"></th>
            </tr>
          </thead>
          <tbody>
            {areas.map((area) => (
              <tr
                key={area.id}
                className={onRowClick ? 'priority-row-clickable' : ''}
                onClick={() => onRowClick?.(area)}
              >
                <td className="priority-location">{area.location}</td>
                <td>{area.issue}</td>
                <td>
                  <SeverityBadge severity={area.severity} />
                </td>
                <td>
                  <StatusBadge status={area.status} />
                </td>
                <td>
                  {onRowClick && <span className="priority-view-link">View</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
