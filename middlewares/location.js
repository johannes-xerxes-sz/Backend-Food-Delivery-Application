const MapboxClient = require('mapbox');

const privateKey = process.env.LOCATION_PRIVATE_KEY;

const client = new MapboxClient(privateKey);

client.geocodeForward('Barangay 26 Cagayan de Oro City', function(err, data) {
  if (err) {
    console.log(err);
  } else {
    const latitude = data.features[0].geometry.coordinates[1];
    const longitude = data.features[0].geometry.coordinates[0];
    console.log(`Longitude: ${longitude}`);
    console.log(`Latitude: ${latitude}`);
  }
});