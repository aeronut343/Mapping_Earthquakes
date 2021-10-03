// Add console.log to check to see if our code is working.
console.log("working");


// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

let satellite = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/satellite-streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

let baseLayer = {
    Streets: streets,
    Satellite: satellite
}

// Create the map object with a center and zoom level.
// let map = L.map('mapid').setView([40.7, -94.5], 4);
let map = L.map("mapid", {
    center: [
        43.7, -79.3
    ],
    zoom: 11,
    layers: [streets]
});


// Then we add our 'graymap' tile layer to the map.
L.control.layers(baseLayer).addTo(map);

// Accessing the Toronto neighborhoods GeoJSON URL.
let torontoHoods = "https://raw.githubusercontent.com/aeronut343/Mapping_Earthquakes/main/torontoNeighborhoods.json";

d3.json(torontoHoods).then( data => L.geoJSON(data).addTo(map));

// Examples:
// ---------------------------------------------------------------------------------------------------------------------
// Accessing the airport GeoJSON URL after loading the map
// let airportData = "https://raw.githubusercontent.com/aeronut343/Mapping_Earthquakes/main/majorAirports.json";

// d3.json(airportData).then(data => L.geoJSON(data, {
//     onEachFeature: (feature, layer) => layer.bindPopup("<h2>Airport code: " + feature.properties.faa + "</h2> <hr> <h3>Airport name: " + feature.properties.name)
// }).addTo(map));
// ---------------------------------------------------------------------------------------------------------------------
// let torontoData = "https://raw.githubusercontent.com/aeronut343/Mapping_Earthquakes/main/torontoRoutes.json";

// // Create a style for the lines.
// let myStyle = {
//     color: "#ffffa1",
//     weight: 2
// }

// // Grabbing our GeoJSON data.
// d3.json(torontoData).then(data => L.geoJson(data, {
//     style: myStyle,
//     onEachFeature: (feature, layer) => layer.bindPopup("<h3>Airline: " + feature.properties.airline + "</h3> <hr><h3> Destination: " + feature.properties.dst + "</h3>")
// }).addTo(map));