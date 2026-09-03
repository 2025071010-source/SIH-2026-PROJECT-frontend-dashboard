
import pool from '../config/database.js';
import { extractGpsFromImage } from '../services/exifService.js';
import { fetchSatelliteData } from '../services/satelliteService.js';
import { evaluateIntervention } from '../services/correlationEngine.js';

export async function processFieldSubmission(req, res) {
  try {
    const imagePath = req.file ? req.file.path : "uploads/default-test-image.jpg";

    const { villageName = 'Village X', interventionType = 'CHECK_DAM' } = req.body;

    let lat = parseFloat(req.body.latitude);
    let lng = parseFloat(req.body.longitude);

    if (isNaN(lat) || isNaN(lng)) {
      const gpsData = await extractGpsFromImage(imagePath);
      if (gpsData.hasGps) {
        lat = gpsData.latitude;
        lng = gpsData.longitude;
      } else {
        return res.status(400).json({ 
          success: false, 
          message: 'GPS coordinates missing from both payload and image EXIF metadata.' 
        });
      }
    }

    // Computer vision mock call
    const cvResult = { structureDetected: true, confidence: 94.5 };

    // Fetch satellite data
    const satelliteData = await fetchSatelliteData(lat, lng);

    // Run correlation logic
    const analysis = evaluateIntervention({ cvResult, satelliteData });

    const statusFormatted = {
      PERFORMING_AS_EXPECTED: '✅ Performing as expected',
      REQUIRES_ATTENTION: '⚠️ Requires attention',
      FAILED: '❌ Critical failure'
    };

    try {
      await pool.query(
        `INSERT INTO users (name, email) VALUES ($1, $2),
        [villageName, ${villageName.toLowerCase().replace(/\s+/g, '')}@watershed.org]`
      );
    } catch (dbErr) {
      console.error('Failed to save to database:', dbErr.message);
    }


    return res.status(200).json({
      success: true,
      data: {
        location: `Village: ${villageName}`,
        coordinates: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
        intervention: interventionType.replace('_', ' '),
        imageAnalysis: analysis.structureDetected ? 'Structure detected' : 'No structure detected',
        satelliteVegetation: (analysis.ndviAfter > analysis.ndviBefore) ? 'Improved' : 'Declined',
        waterPresence: analysis.waterDetected ? 'Detected' : 'Not Detected',
        historicalComparison: analysis.historicalSummary,
        status: statusFormatted[analysis.status]
      }
    });

  } catch (err) {
    console.error('Error processing assessment:', err);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}
export async function getWatershedById(req, res) {
  try {
    res.status(200).json({
      success: true,
      message: "Watershed data retrieved successfully"
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}