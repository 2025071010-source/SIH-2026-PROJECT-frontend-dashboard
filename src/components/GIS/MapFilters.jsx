import React from 'react';
import './MapFilters.css';

export default function MapFilters({
  watersheds,
  interventionTypes,
  watershedId,
  onWatershedChange,
  interventionFilter,
  onInterventionChange,
  severityFilter,
  onSeverityChange,
  layers,
  onLayerToggle,
}) {
  return (
    <aside className="map-filters">
      <div className="map-filters-section">
        <h4 className="map-filters-heading">Filters</h4>

        <label className="control-field map-filters-field">
          <span className="control-label">Watershed</span>
          <select className="control-select" value={watershedId} onChange={(e) => onWatershedChange(e.target.value)}>
            <option value="all">All Watersheds</option>
            {watersheds.map((ws) => (
              <option key={ws.id} value={ws.id}>{ws.name}</option>
            ))}
          </select>
        </label>

        <label className="control-field map-filters-field">
          <span className="control-label">Intervention</span>
          <select className="control-select" value={interventionFilter} onChange={(e) => onInterventionChange(e.target.value)}>
            <option value="All">All</option>
            {interventionTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </label>

        <label className="control-field map-filters-field">
          <span className="control-label">Severity</span>
          <select className="control-select" value={severityFilter} onChange={(e) => onSeverityChange(e.target.value)}>
            <option value="All">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </label>
      </div>

      <div className="map-filters-section">
        <h4 className="map-filters-heading">Layers</h4>
        <label className="map-filters-checkbox">
          <input
            type="checkbox"
            checked={layers.boundary}
            onChange={() => onLayerToggle('boundary')}
          />
          Watershed Boundary
        </label>
        <label className="map-filters-checkbox">
          <input
            type="checkbox"
            checked={layers.images}
            onChange={() => onLayerToggle('images')}
          />
          Geo-Coded Images
        </label>
        <label className="map-filters-checkbox">
          <input
            type="checkbox"
            checked={layers.priorityAreas}
            onChange={() => onLayerToggle('priorityAreas')}
          />
          Priority Areas
        </label>
      </div>

      <p className="map-filters-note">
        Sample/demo geospatial data for prototype purposes only.
      </p>
    </aside>
  );
}
