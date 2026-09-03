import React, { useState } from 'react';
import VegetationChart from '../components/VegetationChart';
import WaterChart from '../components/WaterChart';
import AIInsights from '../components/AIInsights';
import PriorityTable from '../components/PriorityTable';
import Modal from '../components/Modal';
import PriorityAreaDetailPanel from '../components/PriorityAreaDetailPanel';
import { watersheds, watershedData } from '../data/mockData';
import './AnalysisPage.css';

export default function AnalysisPage() {
  const [selectedWatershed, setSelectedWatershed] = useState(watersheds[0].id);
  const [selectedArea, setSelectedArea] = useState(null);

  const data = watershedData[selectedWatershed];
  const { summary, vegetationTrend, waterAvailability, insights, priorityAreas } = data;

  return (
    <div className="analysis-page">
      <section className="page-header">
        <div className="page-header-text">
          <h1 className="page-title">Watershed Analysis</h1>
          <p className="page-subtitle">GIS and field-derived analysis results for the selected watershed</p>
        </div>

        <div className="page-header-controls">
          <label className="control-field">
            <span className="control-label">Watershed</span>
            <select
              className="control-select"
              value={selectedWatershed}
              onChange={(e) => setSelectedWatershed(e.target.value)}
            >
              {watersheds.map((ws) => (
                <option key={ws.id} value={ws.id}>{ws.name}</option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className="analytics-grid analysis-grid">
        <VegetationChart data={vegetationTrend} />
        <WaterChart data={waterAvailability} />
      </section>

      <section className="section-block">
        <div className="section-heading">
          <h3 className="section-heading-title">Intervention Assessment</h3>
          <p className="chart-card-subtitle">Overall condition and monitoring coverage for this watershed</p>
        </div>
        <div className="assessment-grid">
          <div className="assessment-card">
            <span className="assessment-label">Watershed Health Score</span>
            <span className="assessment-value">{summary.healthScore.value}/{summary.healthScore.max}</span>
          </div>
          <div className="assessment-card">
            <span className="assessment-label">Vegetation Change</span>
            <span className="assessment-value">{summary.vegetationChange.value > 0 ? '+' : ''}{summary.vegetationChange.value}{summary.vegetationChange.unit}</span>
          </div>
          <div className="assessment-card">
            <span className="assessment-label">Water Availability</span>
            <span className="assessment-value">{summary.waterAvailability.value > 0 ? '+' : ''}{summary.waterAvailability.value}{summary.waterAvailability.unit}</span>
          </div>
          <div className="assessment-card">
            <span className="assessment-label">Interventions Monitored</span>
            <span className="assessment-value">{summary.interventionsMonitored.value}</span>
          </div>
        </div>
      </section>

      <section className="insights-priority-grid analysis-grid">
        <AIInsights insights={insights} />
        <PriorityTable areas={priorityAreas} onRowClick={setSelectedArea} />
      </section>

      {selectedArea && (
        <Modal title="Priority Area Details" onClose={() => setSelectedArea(null)}>
          <PriorityAreaDetailPanel area={selectedArea} />
        </Modal>
      )}
    </div>
  );
}
