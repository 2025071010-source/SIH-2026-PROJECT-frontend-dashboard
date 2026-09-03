import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  images,
  allPriorityAreas,
  watershedGeo,
  defaultMapView,
} from '../../data/mockData';
import { ImageMarkerPopup, AreaMarkerPopup } from './MapPopup';
import './GISMap.css';

const SEVERITY_COLORS = {
  High: '#B3261E',
  Medium: '#B4740E',
  Low: '#1E7A5C',
};

const IMAGE_MARKER_COLOR = '#2B6CA3';

function createDivIcon(color, size = 16) {
  return L.divIcon({
    className: 'gis-div-icon',
    html: `<span class="gis-marker-dot" style="width:${size}px;height:${size}px;background:${color};"></span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
}

const boundaryStyle = {
  color: '#1E7A5C',
  weight: 2,
  fillColor: '#1E7A5C',
  fillOpacity: 0.08,
  dashArray: '5, 4',
};

/**
 * Recenters the map whenever the selected watershed (and therefore the
 * target center/zoom) changes. react-leaflet does not do this automatically
 * when the `center`/`zoom` props change after the initial mount.
 */
function MapViewController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView([center.lat, center.lng], zoom);
  }, [map, center.lat, center.lng, zoom]);
  return null;
}

export default function GISMap({
  watershedId,
  showBoundary,
  showImages,
  showPriorityAreas,
  interventionFilter,
  severityFilter,
  onImageClick,
  onAreaClick,
}) {
  const view = watershedId === 'all' ? defaultMapView : watershedGeo[watershedId];

  const boundaryFeatures = useMemo(() => {
    const ids = watershedId === 'all' ? Object.keys(watershedGeo) : [watershedId];
    return ids.map((id) => watershedGeo[id].boundary);
  }, [watershedId]);

  const visibleImages = useMemo(
    () =>
      images.filter(
        (img) =>
          (watershedId === 'all' || img.watershedId === watershedId) &&
          (interventionFilter === 'All' || img.interventionType === interventionFilter)
      ),
    [watershedId, interventionFilter]
  );

  const visibleAreas = useMemo(
    () =>
      allPriorityAreas.filter(
        (area) =>
          (watershedId === 'all' || area.watershedId === watershedId) &&
          (severityFilter === 'All' || area.severity === severityFilter)
      ),
    [watershedId, severityFilter]
  );

  return (
    <div className="gis-map-wrap">
      <MapContainer
        center={[view.center.lat, view.center.lng]}
        zoom={view.zoom}
        scrollWheelZoom
        className="gis-map"
      >
        <MapViewController center={view.center} zoom={view.zoom} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {showBoundary &&
          boundaryFeatures.map((feature) => (
            <GeoJSON key={feature.properties.id} data={feature} style={boundaryStyle} />
          ))}

        {showImages &&
          visibleImages.map((image) => (
            <Marker
              key={image.id}
              position={[image.lat, image.lng]}
              icon={createDivIcon(IMAGE_MARKER_COLOR)}
            >
              <Popup>
                <ImageMarkerPopup image={image} onViewImage={onImageClick} />
              </Popup>
            </Marker>
          ))}

        {showPriorityAreas &&
          visibleAreas.map((area) => (
            <Marker
              key={area.id}
              position={[area.lat, area.lng]}
              icon={createDivIcon(SEVERITY_COLORS[area.severity] || SEVERITY_COLORS.Low)}
            >
              <Popup>
                <AreaMarkerPopup area={area} onViewDetails={onAreaClick} />
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}
