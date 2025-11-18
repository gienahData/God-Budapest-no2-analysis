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
- `NO2_God.ipynb`: Python notebook to process and visualize exported TIFFs
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

https://github.com/gienahData/God-Budapest-no2-analysis/blob/7540aeaa98e8590bad6c6e9befe235d2aab2ae3b/NO2_Quarterly_Overview_PANEL.png 

## 🛠️ Credits

- EO Analysis by Tunde Szabo
- OSINT inspiration from open-source investigators (e.g. Sofia Santos)
- Tools: Google Earth Engine, Python, QGIS

