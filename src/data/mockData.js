/**
 * mockData.js
 * ---------------------------------------------------------------------------
 * Temporary local data for the GEOVISION dashboard UI.
 *
 * Every export here is shaped like the JSON a Node.js REST API would return.
 * When the backend is ready, turn each constant/function below into a fetch
 * call that resolves to the same shape, e.g.:
 *
 *   export async function getWatershedData(watershedId) {
 *     const res = await fetch(`${API_BASE_URL}/api/watersheds/${watershedId}`);
 *     return res.json();
 *   }
 *
 * No component hardcodes numbers directly — everything is read from here and
 * passed down through props, so the eventual swap only has to happen once,
 * in this file.
 * ---------------------------------------------------------------------------
 */

import beforeImg from '../assets/images/beforeIntervention.svg';
import afterImg from '../assets/images/afterIntervention.svg';
import checkDamImg from '../assets/images/checkDam.svg';
import afforestationImg from '../assets/images/afforestation.svg';
import contourTrenchingImg from '../assets/images/contourTrenching.svg';
import farmPondImg from '../assets/images/farmPond.svg';

// ---------------------------------------------------------------------------
// Selector options
// ---------------------------------------------------------------------------

export const watersheds = [
  { id: 'ws-01', name: 'Kanhar Watershed' },
  { id: 'ws-02', name: 'Betwa Sub-basin' },
  { id: 'ws-03', name: 'Sindh Catchment' },
];

// `months` = how many trailing months of chart data the range shows.
// (An approximation for the prototype — a real API would filter by date.)
export const dateRanges = [
  { id: 'range-30d', label: 'Last 30 days', months: 3 },
  { id: 'range-6m', label: 'Last 6 months', months: 6 },
  { id: 'range-1y', label: 'Last year', months: 12 },
];

// ---------------------------------------------------------------------------
// Per-watershed data
// ---------------------------------------------------------------------------

export const watershedData = {
  'ws-01': {
    summary: {
      healthScore: { value: 78, max: 100, trend: '+4 pts', trendDirection: 'up' },
      vegetationChange: { value: 12, unit: '%', trendDirection: 'up' },
      waterAvailability: { value: 8, unit: '%', trendDirection: 'up' },
      interventionsMonitored: { value: 42, trendDirection: 'flat' },
    },
    vegetationTrend: [
      { month: 'Jan', ndvi: 0.31 }, { month: 'Feb', ndvi: 0.33 }, { month: 'Mar', ndvi: 0.36 },
      { month: 'Apr', ndvi: 0.38 }, { month: 'May', ndvi: 0.4 }, { month: 'Jun', ndvi: 0.44 },
      { month: 'Jul', ndvi: 0.49 }, { month: 'Aug', ndvi: 0.52 }, { month: 'Sep', ndvi: 0.5 },
      { month: 'Oct', ndvi: 0.47 }, { month: 'Nov', ndvi: 0.43 }, { month: 'Dec', ndvi: 0.41 },
    ],
    waterAvailability: [
      { month: 'Jan', percent: 38 }, { month: 'Feb', percent: 40 }, { month: 'Mar', percent: 37 },
      { month: 'Apr', percent: 34 }, { month: 'May', percent: 31 }, { month: 'Jun', percent: 39 },
      { month: 'Jul', percent: 48 }, { month: 'Aug', percent: 53 }, { month: 'Sep', percent: 51 },
      { month: 'Oct', percent: 46 }, { month: 'Nov', percent: 43 }, { month: 'Dec', percent: 41 },
    ],
    changeAnalysis: {
      // Inside 'ws-01' -> changeAnalysis
      beforeImage: { label: 'Before Intervention', date: 'Jan 2024', src: beforeImg },
      afterImage: { label: 'After Intervention', date: 'Jun 2026', src: afterImg },
      stats: [
        { label: 'Vegetation cover', before: 42, after: 54, unit: '%' },
        { label: 'Water availability', before: 35, after: 43, unit: '%' },
      ],
      overallChange: 12,
    },
    insights: [
      { id: 'insight-1', type: 'positive', text: 'Vegetation increased by 12% in the selected watershed.' },
      { id: 'insight-2', type: 'positive', text: 'Water availability shows improvement across monitored sites.' },
      { id: 'insight-3', type: 'warning', text: '3 areas require further inspection.' },
      { id: 'insight-4', type: 'neutral', text: '42 watershed interventions are being monitored.' },
    ],
    priorityAreas: [
      { id: 'area-1', location: 'Village A', issue: 'High erosion risk', severity: 'High', status: 'Needs Inspection', coordinates: '24.58° N, 81.30° E', lat: 24.58, lng: 81.3, description: 'Steep slope with active gully erosion near the check-dam catchment.' },
      { id: 'area-2', location: 'Village B', issue: 'Low vegetation cover', severity: 'Medium', status: 'Monitor', coordinates: '24.61° N, 81.34° E', lat: 24.61, lng: 81.34, description: 'Afforestation survival rate below target; recommend replanting.' },
      { id: 'area-3', location: 'Village C', issue: 'Water availability decline', severity: 'High', status: 'Needs Inspection', coordinates: '24.55° N, 81.29° E', lat: 24.55, lng: 81.29, description: 'Seasonal stream showing reduced flow compared to last cycle.' },
      { id: 'area-4', location: 'Village D', issue: 'Check-dam siltation', severity: 'Low', status: 'Monitor', coordinates: '24.63° N, 81.31° E', lat: 24.63, lng: 81.31, description: 'Minor silt build-up observed at the spillway; no immediate risk.' },
    ],
  },

  'ws-02': {
    summary: {
      healthScore: { value: 64, max: 100, trend: '+2 pts', trendDirection: 'up' },
      vegetationChange: { value: 7, unit: '%', trendDirection: 'up' },
      waterAvailability: { value: -3, unit: '%', trendDirection: 'down' },
      interventionsMonitored: { value: 28, trendDirection: 'flat' },
    },
    vegetationTrend: [
      { month: 'Jan', ndvi: 0.26 }, { month: 'Feb', ndvi: 0.27 }, { month: 'Mar', ndvi: 0.29 },
      { month: 'Apr', ndvi: 0.3 }, { month: 'May', ndvi: 0.32 }, { month: 'Jun', ndvi: 0.34 },
      { month: 'Jul', ndvi: 0.37 }, { month: 'Aug', ndvi: 0.39 }, { month: 'Sep', ndvi: 0.36 },
      { month: 'Oct', ndvi: 0.33 }, { month: 'Nov', ndvi: 0.3 }, { month: 'Dec', ndvi: 0.28 },
    ],
    waterAvailability: [
      { month: 'Jan', percent: 44 }, { month: 'Feb', percent: 43 }, { month: 'Mar', percent: 40 },
      { month: 'Apr', percent: 36 }, { month: 'May', percent: 32 }, { month: 'Jun', percent: 35 },
      { month: 'Jul', percent: 41 }, { month: 'Aug', percent: 45 }, { month: 'Sep', percent: 42 },
      { month: 'Oct', percent: 39 }, { month: 'Nov', percent: 37 }, { month: 'Dec', percent: 38 },
    ],
    changeAnalysis: {
      // Inside 'ws-01' -> changeAnalysis
     beforeImage: { label: 'Before Intervention', date: 'Jan 2024', src: beforeImg },
     afterImage: { label: 'After Intervention', date: 'Jun 2026', src: afterImg },
      stats: [
        { label: 'Vegetation cover', before: 33, after: 40, unit: '%' },
        { label: 'Water availability', before: 39, after: 36, unit: '%' },
      ],
      overallChange: 7,
    },
    insights: [
      { id: 'insight-1', type: 'positive', text: 'Vegetation increased by 7% following the afforestation drive.' },
      { id: 'insight-2', type: 'warning', text: 'Water availability dipped slightly versus last cycle.' },
      { id: 'insight-3', type: 'warning', text: '2 areas require further inspection.' },
      { id: 'insight-4', type: 'neutral', text: '28 watershed interventions are being monitored.' },
    ],
    priorityAreas: [
      { id: 'area-5', location: 'Village E', issue: 'Groundwater table drop', severity: 'High', status: 'Needs Inspection', coordinates: '25.02° N, 79.11° E', lat: 25.02, lng: 79.11, description: 'Borewell readings show a falling water table over the last two cycles.' },
      { id: 'area-6', location: 'Village F', issue: 'Sparse canopy cover', severity: 'Medium', status: 'Monitor', coordinates: '25.05° N, 79.14° E', lat: 25.05, lng: 79.14, description: 'Canopy density below the sub-basin average; consider a second planting phase.' },
      { id: 'area-7', location: 'Village G', issue: 'Farm pond siltation', severity: 'Low', status: 'Monitor', coordinates: '24.98° N, 79.09° E', lat: 24.98, lng: 79.09, description: 'Pond storage capacity slightly reduced due to sediment inflow.' },
    ],
  },

  'ws-03': {
    summary: {
      healthScore: { value: 85, max: 100, trend: '+6 pts', trendDirection: 'up' },
      vegetationChange: { value: 18, unit: '%', trendDirection: 'up' },
      waterAvailability: { value: 15, unit: '%', trendDirection: 'up' },
      interventionsMonitored: { value: 51, trendDirection: 'up' },
    },
    vegetationTrend: [
      { month: 'Jan', ndvi: 0.35 }, { month: 'Feb', ndvi: 0.37 }, { month: 'Mar', ndvi: 0.4 },
      { month: 'Apr', ndvi: 0.43 }, { month: 'May', ndvi: 0.46 }, { month: 'Jun', ndvi: 0.5 },
      { month: 'Jul', ndvi: 0.55 }, { month: 'Aug', ndvi: 0.58 }, { month: 'Sep', ndvi: 0.56 },
      { month: 'Oct', ndvi: 0.53 }, { month: 'Nov', ndvi: 0.49 }, { month: 'Dec', ndvi: 0.46 },
    ],
    waterAvailability: [
      { month: 'Jan', percent: 42 }, { month: 'Feb', percent: 45 }, { month: 'Mar', percent: 44 },
      { month: 'Apr', percent: 41 }, { month: 'May', percent: 39 }, { month: 'Jun', percent: 47 },
      { month: 'Jul', percent: 56 }, { month: 'Aug', percent: 61 }, { month: 'Sep', percent: 58 },
      { month: 'Oct', percent: 54 }, { month: 'Nov', percent: 50 }, { month: 'Dec', percent: 48 },
    ],
    changeAnalysis: {
      // Inside 'ws-01' -> changeAnalysis
    beforeImage: { label: 'Before Intervention', date: 'Jan 2024', src: beforeImg },
    afterImage: { label: 'After Intervention', date: 'Jun 2026', src: afterImg },
      stats: [
        { label: 'Vegetation cover', before: 39, after: 57, unit: '%' },
        { label: 'Water availability', before: 33, after: 48, unit: '%' },
      ],
      overallChange: 18,
    },
    insights: [
      { id: 'insight-1', type: 'positive', text: 'Vegetation increased by 18% — the strongest gain across all watersheds.' },
      { id: 'insight-2', type: 'positive', text: 'Water availability improved by 15% after new check-dam construction.' },
      { id: 'insight-3', type: 'warning', text: '1 area still requires further inspection.' },
      { id: 'insight-4', type: 'neutral', text: '51 watershed interventions are being monitored.' },
    ],
    priorityAreas: [
      { id: 'area-8', location: 'Village H', issue: 'Trench maintenance overdue', severity: 'Medium', status: 'Monitor', coordinates: '26.11° N, 78.44° E', lat: 26.11, lng: 78.44, description: 'Contour trenches due for annual desilting and reinforcement.' },
      { id: 'area-9', location: 'Village I', issue: 'Localised erosion patch', severity: 'Low', status: 'Monitor', coordinates: '26.14° N, 78.47° E', lat: 26.14, lng: 78.47, description: 'Small erosion patch identified downstream of the farm pond outlet.' },
    ],
  },
};

// ---------------------------------------------------------------------------
// Recent geo-coded field images — shown on the Dashboard and the Images page
// ---------------------------------------------------------------------------

export const images = [
  {
    id: 'img-1',
    watershedId: 'ws-01',
    interventionType: 'Check Dam Construction',
    location: 'Village A',
    date: '12 Aug 2026',
    coordinates: '24.581° N, 81.303° E', lat: 24.581, lng: 81.303,
    status: 'Completed',
    description: 'A masonry check dam built across the seasonal stream to slow runoff and recharge groundwater upstream of Village A.',
    src: checkDamImg,
  },
  {
    id: 'img-2',
    watershedId: 'ws-01',
    interventionType: 'Afforestation Drive',
    location: 'Village B',
    date: '08 Aug 2026',
    coordinates: '24.612° N, 81.338° E', lat: 24.612, lng: 81.338,
    status: 'In Progress',
    description: 'Native sapling plantation across 4 hectares of degraded hillside, part of the sub-basin canopy restoration plan.',
    src: afforestationImg,
  },
  {
    id: 'img-3',
    watershedId: 'ws-01',
    interventionType: 'Contour Trenching',
    location: 'Village C',
    date: '02 Aug 2026',
    coordinates: '24.549° N, 81.287° E', lat: 24.549, lng: 81.287,
    status: 'Completed',
    description: 'Contour trenches dug along the hillside gradient to reduce surface runoff velocity and improve soil moisture retention.',
    src: contourTrenchingImg,
  },
  {
    id: 'img-4',
    watershedId: 'ws-01',
    interventionType: 'Farm Pond Development',
    location: 'Village D',
    date: '27 Jul 2026',
    coordinates: '24.627° N, 81.312° E', lat: 24.627, lng: 81.312,
    status: 'Completed',
    description: 'A lined farm pond constructed to store monsoon runoff for supplemental irrigation during dry months.',
    src: farmPondImg,
  },
];

export const interventionTypes = [...new Set(images.map((img) => img.interventionType))];
export const imageLocations = [...new Set(images.map((img) => img.location))];

// ---------------------------------------------------------------------------
// Reports
// ---------------------------------------------------------------------------

export const reports = [
  {
    id: 'report-1',
    name: 'Q2 2026 Watershed Health Report',
    watershedId: 'ws-01',
    date: '01 Jul 2026',
    status: 'Final',
  },
  {
    id: 'report-2',
    name: 'Mid-Year Intervention Assessment',
    watershedId: 'ws-02',
    date: '15 Jun 2026',
    status: 'Final',
  },
  {
    id: 'report-3',
    name: 'Vegetation & Water Trend Summary',
    watershedId: 'ws-03',
    date: '20 Aug 2026',
    status: 'Draft',
  },
];

// ---------------------------------------------------------------------------
// GIS Map data
// ---------------------------------------------------------------------------
// SAMPLE / DEMO DATA ONLY. These boundaries and centers are approximate,
// hand-placed rectangles around the mock village coordinates above — they do
// not represent a real, surveyed watershed boundary. They exist purely to
// give the prototype map something to draw.
//
// Everything below is *derived* from the data already defined in this file
// (watershedData, images) rather than duplicated, so there is still a single
// source of truth. When a real GIS/backend service exists, `watershedGeo`
// would come from e.g. GET /api/watersheds/:id/boundary and the flattened
// helper arrays below would come from GET /api/priority-areas / GET /api/images.

export const watershedGeo = {
  'ws-01': {
    center: { lat: 24.59, lng: 81.31 },
    zoom: 11,
    boundary: {
      type: 'Feature',
      properties: { id: 'ws-01', name: 'Kanhar Watershed (sample boundary)' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [81.25, 24.50], [81.39, 24.50], [81.39, 24.68], [81.25, 24.68], [81.25, 24.50],
        ]],
      },
    },
  },
  'ws-02': {
    center: { lat: 25.01, lng: 79.12 },
    zoom: 11,
    boundary: {
      type: 'Feature',
      properties: { id: 'ws-02', name: 'Betwa Sub-basin (sample boundary)' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [79.04, 24.90], [79.21, 24.90], [79.21, 25.10], [79.04, 25.10], [79.04, 24.90],
        ]],
      },
    },
  },
  'ws-03': {
    center: { lat: 26.13, lng: 78.46 },
    zoom: 11,
    boundary: {
      type: 'Feature',
      properties: { id: 'ws-03', name: 'Sindh Catchment (sample boundary)' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [78.37, 26.04], [78.53, 26.04], [78.53, 26.20], [78.37, 26.20], [78.37, 26.04],
        ]],
      },
    },
  },
};

// Default center/zoom for the "all watersheds" map view (roughly framing all
// three sample boundaries above).
export const defaultMapView = { center: { lat: 25.28, lng: 79.63 }, zoom: 6 };

// Flattened priority areas across every watershed, each tagged with its
// watershedId — built from watershedData so there is no separate copy of
// the underlying list.
export const allPriorityAreas = Object.entries(watershedData).flatMap(
  ([watershedId, data]) => data.priorityAreas.map((area) => ({ ...area, watershedId }))
);

