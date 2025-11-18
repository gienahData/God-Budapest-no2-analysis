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
