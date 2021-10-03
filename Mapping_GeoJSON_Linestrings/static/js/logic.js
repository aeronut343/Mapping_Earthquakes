// Add console.log to check to see if our code is working.
console.log("working");


// We create the tile layer that will be the background of our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/dark-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

let baseLayer = {
    Dark: dark,
    Light: streets
}

// Create the map object with a center and zoom level.
// let map = L.map('mapid').setView([40.7, -94.5], 4);
let map = L.map("mapid", {
    center: [
        30, 30
    ],
    zoom: 2,
    layers: [dark]
});


// Then we add our 'graymap' tile layer to the map.
L.control.layers(baseLayer).addTo(map);

// Accessing the airport GeoJSON URL after loading the map
let airportData = "https://raw.githubusercontent.com/aeronut343/Mapping_Earthquakes/main/majorAirports.json";

d3.json(airportData).then(data => L.geoJSON(data, {
    onEachFeature: (feature, layer) => layer.bindPopup("<h2>Airport code: " + feature.properties.faa + "</h2> <hr> <h3>Airport name: " + feature.properties.name)
}).addTo(map));

// Grabbing our GeoJSON data.
// L.geoJSON(sanFranAirport, {
//     pointToLayer: (feature, latlng) => L.marker(latlng)
//     .bindPopup("<h2>" + feature.properties.name + "</h2> <hr> <h3>" + feature.properties.city + ", " + feature.properties.country)
// }).addTo(map);

// L.geoJSON(sanFranAirport, {
//     onEachFeature: (feature, layer) => layer.bindPopup("<h2>" + feature.properties.name + "</h2> <hr> <h3>" + feature.properties.city + ", " + feature.properties.country)
// }).addTo(map);