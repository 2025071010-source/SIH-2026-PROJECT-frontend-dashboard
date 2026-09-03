import React, { useState } from 'react';
import MapFilters from '../components/GIS/MapFilters';
import GISMap from '../components/GIS/GISMap';
import MapLegend from '../components/GIS/MapLegend';
import Modal from '../components/Modal';
import ImageDetailPanel from '../components/ImageDetailPanel';
import PriorityAreaDetailPanel from '../components/PriorityAreaDetailPanel';
import { watersheds, interventionTypes } from '../data/mockData';
import './GISMapPage.css';

export default function GISMapPage() {
  const [watershedId, setWatershedId] = useState('all');
  const [interventionFilter, setInterventionFilter] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [layers, setLayers] = useState({ boundary: true, images: true, priorityAreas: true });

  // Reuses the exact same Modal + detail-panel components as the Dashboard
  // and Analysis pages, so "View Image" / "View Details" on the map open
  // the same UI the rest of the app already uses — no duplicate modal.
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);

  const handleLayerToggle = (layerKey) => {
    setLayers((prev) => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  return (
    <div className="gis-page">
      <section className="page-header">
        <div className="page-header-text">
          <h1 className="page-title">Geospatial Watershed Map</h1>
          <p className="page-subtitle">Visualize watershed conditions, interventions and priority areas</p>
        </div>
      </section>

      <MapLegend />

      <section className="gis-layout">
        <MapFilters
          watersheds={watersheds}
          interventionTypes={interventionTypes}
          watershedId={watershedId}
          onWatershedChange={setWatershedId}
          interventionFilter={interventionFilter}
          onInterventionChange={setInterventionFilter}
          severityFilter={severityFilter}
          onSeverityChange={setSeverityFilter}
          layers={layers}
          onLayerToggle={handleLayerToggle}
        />

        <GISMap
          watershedId={watershedId}
          showBoundary={layers.boundary}
          showImages={layers.images}
          showPriorityAreas={layers.priorityAreas}
          interventionFilter={interventionFilter}
          severityFilter={severityFilter}
          onImageClick={setSelectedImage}
          onAreaClick={setSelectedArea}
        />
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
