import React, { useState } from 'react';
import Modal from '../components/Modal';
import ReportPreview from '../components/ReportPreview';
import { reports, watersheds, watershedData } from '../data/mockData';
import './ReportsPage.css';

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState(null);

  const getWatershed = (watershedId) => watersheds.find((ws) => ws.id === watershedId);

  return (
    <div className="reports-page">
      <section className="page-header">
        <div className="page-header-text">
          <h1 className="page-title">Watershed Reports</h1>
          <p className="page-subtitle">Summary of watershed monitoring and assessment</p>
        </div>
      </section>

      <section className="reports-table-wrap">
        <table className="reports-table">
          <thead>
            <tr>
              <th>Report</th>
              <th>Watershed</th>
              <th>Date</th>
              <th>Status</th>
              <th aria-hidden="true"></th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => {
              const watershed = getWatershed(report.watershedId);
              return (
                <tr key={report.id}>
                  <td className="reports-name">{report.name}</td>
                  <td>{watershed?.name}</td>
                  <td>{report.date}</td>
                  <td>
                    <span className={`reports-status reports-status-${report.status.toLowerCase()}`}>
                      {report.status}
                    </span>
                  </td>
                  <td>
                    <button className="reports-view-button" onClick={() => setSelectedReport(report)}>
                      View Report
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      {selectedReport && (
        <Modal title={selectedReport.name} onClose={() => setSelectedReport(null)} width="560px">
          <ReportPreview
            report={selectedReport}
            watershed={getWatershed(selectedReport.watershedId)}
            data={watershedData[selectedReport.watershedId]}
          />
        </Modal>
      )}
    </div>
  );
}
