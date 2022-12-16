const MapboxClient = require('mapbox');

const client = new MapboxClient('pk.eyJ1Ijoiam9oYW5uZXMteGVyeGVzLXN6IiwiYSI6ImNsYnB0dmxoZzFldDUzcWxid2U3NWlsYjEifQ.Z6OOtqsuSTqovj4TOJTxpg');

client.geocodeForward('Barangay 26 Cagayan de Oro City', function(err, data) {
  if (err) {
    console.log(err);
  } else {
    const longitude = data.features[0].geometry.coordinates[0];
    const latitude = data.features[0].geometry.coordinates[1];
    console.log(`Longitude: ${longitude}`);
    console.log(`Latitude: ${latitude}`);
  }
});