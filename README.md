# God-Budapest-no2-analysis
# 🛰️ NO₂ Emissions Analysis: Samsung SDI Göd Plant (2022–2024)

This project investigates quarterly NO₂ emission dynamics in the vicinity of the Samsung SDI battery plant in Göd, Hungary, using Sentinel-5P satellite data and open-source tools like Google Earth Engine (GEE) and Python geospatial libraries.

## 🎯 Objectives

- Detect temporal patterns in NO₂ emissions from 2022 to 2024
- Identify pollution peaks using quarterly aggregation
- Compare emission trends with reported industrial expansion
- Use EO and OSINT-inspired techniques to build civic transparency tools

## 📦 Contents

- `gee_script.js`: Earth Engine script to generate NO₂ quarterly composites 

// AOI around Göd
var godPoint = ee.Geometry.Point([19.167085, 47.679723]);
var buffer = godPoint.buffer(30000);
Map.centerObject(buffer, 10);

// Load NO₂ dataset
var no2 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
  .select("NO2_column_number_density")
  .filterBounds(buffer)
  .filterDate("2022-01-01", "2024-12-31")
  .filter(ee.Filter.lt("cloud_fraction", 0.7));

// Generate [year, month]
var years = ee.List.sequence(2022, 2024);
var months = ee.List.sequence(1, 12);
var quarters = months.map(function(m) {
  return ee.List.sequence(1, 4);
}).flatten();

var monthlyNO2 = ee.ImageCollection(
  years.map(function(y) {
    return ee.List.sequence(1, 12, 3).map(function(startMonth) {
      var start = ee.Date.fromYMD(y, startMonth, 1);
      var end = start.advance(3, 'month');
      return no2.filterDate(start, end)
        .mean()
        .set('label', ee.String('Q').cat(start.get('month').divide(3).ceil().format()).cat('_').cat(y.format()))
        .set('system:time_start', start.millis());
    });
  }).flatten()
);

Export.image.toDrive({
  image: monthlyNO2.first().clip(buffer),
  description: 'NO2_Q1_2022_God',
  folder: 'EarthEngineExports',
  fileNamePrefix: 'NO2_Q1_2022_God',
  region: buffer,
  scale: 1000,
  maxPixels: 1e13,
  crs: 'EPSG:4326'
});

- `visualization.ipynb`: Python notebook to process and visualize exported TIFFs
- `/outputs`: PNGs, GIFs, and map panels
- `/data`: Sentinel-5P quarterly GeoTIFFs (processed)
- `/docs`: Presentation decks, reports, and public summaries

## 📡 Data Sources

- [Google Earth Engine – Sentinel-5P NO₂ (OFFL)](https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_S5P_OFFL_L3_NO2)
- Processed using [GEE Code Editor](https://code.earthengine.google.com)

## 🧠 Methodology

1. Define AOI (30 km buffer around Göd)
2. Filter Sentinel-5P NO₂ data (2022–2024)
3. Aggregate to quarterly means
4. Export clipped GeoTIFFs
5. Visualize in Python (matplotlib, rasterio, geopandas)
6. Output: animated GIFs, maps, and quarterly panels

## 👀 Preview

![NO₂ Change 2022–2024](https://github.com/gienahData/God-Budapest-no2-analysis/blob/main/NO2_God_Quarterly_FINAL.gif)

## 🛠️ Credits

- EO Analysis by Tunde Szabo
- OSINT inspiration from open-source investigators (e.g. Sofia Santos)
- Tools: Google Earth Engine, Python, QGIS

