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
        39.5, -98.5
    ],
    zoom: 3,
    layers: [streets]
});

let earthquakes = new L.layerGroup();

// We define an object that contains the overlays.
// This overlay will be visible all the time.
let overlays = {
    Earthquakes: earthquakes
};

// Then we add our 'graymap' tile layer to the map.
L.control.layers(baseLayer, overlays).addTo(map);

function styleInfo(feature) {
    return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.mag),
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
    };
}

function getRadius(magnitude) {
    if (magnitude === 0) {
        return 1;
    }
    return magnitude * 4;
}

function getColor(magnitude) {
    if (magnitude > 5) {
        return "#ea2c2c";
    }
    if (magnitude > 4) {
        return "#ea822c";
    }
    if (magnitude > 3) {
        return "#ee9c00";
    }
    if (magnitude > 2) {
        return "#eecc00";
    }
    if (magnitude > 1) {
        return "#d4ee00";
    }
    return "#98ee00";
}

// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(data =>
    L.geoJson(data, {
        pointToLayer: (feature, latlng) => L.circleMarker(latlng, styleInfo(feature)),
        onEachFeature: function (feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place)
        }
    }).addTo(earthquakes)
);

earthquakes.addTo(map);

// Create a legend control object.
let legend = L.control({
    position: "bottomright"
});

// Then add all the details for the legend.
legend.onAdd = function () {
    let div = L.DomUtil.create("div", "info legend");
    const magnitudes = [0, 1, 2, 3, 4, 5];
    const colors = [
        "#98ee00",
        "#d4ee00",
        "#eecc00",
        "#ee9c00",
        "#ea822c",
        "#ea2c2c"
    ];
    // Looping through our intervals to generate a label with a colored square for each interval.
    for (var i = 0; i < magnitudes.length; i++) {
        console.log(colors[i]);
        div.innerHTML +=
            "<i style='background: " + colors[i] + "'></i> " +
            magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
    }
    console.log("I made it!");
    return div;
};

legend.addTo(map);

// // Accessing the Toronto neighborhoods GeoJSON URL.
// let torontoHoods = "https://raw.githubusercontent.com/aeronut343/Mapping_Earthquakes/main/torontoNeighborhoods.json";

// d3.json(torontoHoods).then( data => L.geoJSON(data).addTo(map));

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