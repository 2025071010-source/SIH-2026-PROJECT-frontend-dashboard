
import React, { useState, useEffect, useMemo } from 'react';
import SummaryCard from '../components/SummaryCard';
import VegetationChart from '../components/VegetationChart';
import WaterChart from '../components/WaterChart';
import ChangeAnalysis from '../components/ChangeAnalysis';
import AIInsights from '../components/AIInsights';
import PriorityTable from '../components/PriorityTable';
import ImageCard from '../components/ImageCard';
import Modal from '../components/Modal';
import ImageDetailPanel from '../components/ImageDetailPanel';
import PriorityAreaDetailPanel from '../components/PriorityAreaDetailPanel';
import {
  watersheds,
  dateRanges,
  watershedData,
  images,
} from '../data/mockData';
import './Dashboard.css';

  // If data hasn't loaded yet, show a loading message
  
  // Rest of your friend's return/UI code goes here...

const ICON_LEAF = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 13C2 6 6 3 14 3C14 10 11 13 5 13C4 13 2 12.5 2 13Z" fill="currentColor" />
  </svg>
);

const ICON_DROP = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 2C8 2 3 8 3 11C3 13.5 5.2 15 8 15C10.8 15 13 13.5 13 11C13 8 8 2 8 2Z" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

const ICON_CHECK = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="2" y="2" width="12" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
    <path d="M4.8 8L7 10.2L11.2 5.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Dashboard() {

const [selectedWatershed, setSelectedWatershed] = useState(watersheds[0].id);


  const [selectedRange, setSelectedRange] = useState(dateRanges[0].id);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);


  const currentdata = watershedData[selectedWatershed];
  const data = currentdata;
  const range = dateRanges.find((r) => r.id === selectedRange) || dateRanges[dateRanges.length - 1];

  // Slice the trailing N months of chart data based on the selected date range —
  // this is what makes the charts respond to the date filter.
  const vegetationTrend = useMemo(
    () => currentdata.vegetationTrend.slice(-range.months),
    [currentdata, range]
  );
  const waterAvailability = useMemo(
    () => currentdata.waterAvailability.slice(-range.months),
    [currentdata, range]
  );

  if (!data) {
    return <div>Loading real backend data...</div>;
  }

  const { summary, changeAnalysis, insights, priorityAreas } = data;

  return (
    <div className="dashboard">
      {/* Page header */}
      <section className="page-header">
        <div className="page-header-text">
          <h1 className="page-title">Watershed Dashboard</h1>
          <p className="page-subtitle">Monitor watershed conditions and intervention outcomes</p>
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
                <option key={ws.id} value={ws.id}>
                  {ws.name}
                </option>
              ))}
            </select>
          </label>

          <label className="control-field">
            <span className="control-label">Date range</span>
            <select
              className="control-select"
              value={selectedRange}
              onChange={(e) => setSelectedRange(e.target.value)}
            >
              {dateRanges.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      {/* Summary cards */}
      <section className="summary-grid">
        <SummaryCard
          title="Watershed Health Score"
          value={data.summary.healthScore.value}
          max={summary.healthScore.max}
          trendLabel={summary.healthScore.trend}
          trendDirection={summary.healthScore.trendDirection}
          variant="ring"
        />
        <SummaryCard
          title="Vegetation Change"
          value={`${data.summary.vegetationChange.value > 0 ? '+' : ''}${summary.vegetationChange.value}`}
          unit={summary.vegetationChange.unit}
          trendLabel="vs last cycle"
          trendDirection={summary.vegetationChange.trendDirection}
          icon={ICON_LEAF}
        />
        <SummaryCard
          title="Water Availability"
          value={`${data.summary.waterAvailability.value > 0 ? '+' : ''}${summary.waterAvailability.value}`}
          unit={summary.waterAvailability.unit}
          trendLabel="vs last cycle"
          trendDirection={summary.waterAvailability.trendDirection}
          icon={ICON_DROP}
        />
        <SummaryCard
          title="Interventions Monitored"
          value={data.summary.interventionsMonitored.value}
          trendLabel="active this cycle"
          trendDirection={summary.interventionsMonitored.trendDirection}
          icon={ICON_CHECK}
        />
      </section>

      {/* Analytics */}
      <section className="analytics-grid">
        <VegetationChart data={data.vegetationTrend} />
        <WaterChart data={data.waterAvailability} />
      </section>

      {/* Before / after change analysis */}
      <section className="section-block">
        <ChangeAnalysis data={data.changeAnalysis} />
      </section>

      {/* AI insights + priority areas */}
      <section className="insights-priority-grid">
        <AIInsights insights={data.insights} />
        <PriorityTable areas={data.priorityAreas} onRowClick={setSelectedArea} />
      </section>

      {/* Recent geo-coded images */}
      <section className="section-block">
        <div className="section-heading">
          <h3 className="section-heading-title">Recent Geo-Coded Images</h3>
          <p className="chart-card-subtitle">Latest field captures from monitored sites</p>
        </div>
        <div className="images-grid">
          {images.map((image) => (
            <ImageCard key={image.id} image={image} onViewDetails={setSelectedImage} />
          ))}
        </div>
      </section>

      {selectedImage && (
        <Modal title="Image Details" onClose={() => setSelectedImage(null)}>
          <ImageDetailPanel image={selectedImage} />
        </Modal>
      )}

      {selectedArea && (
        <Modal title="Priority Area Details" onClose={() => setSelectedArea(null)}>
          <PriorityAreaDetailPanel area={selectedArea} />
        </Modal>
      )}
    </div>
  );
}
