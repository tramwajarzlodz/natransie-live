const map = L.map('map').setView([51.7592, 19.4560], 13); // Centrum Łodzi

// Ciemna mapa z CartoDB
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://carto.com/">CARTO</a> & OpenStreetMap contributors',
    subdomains: 'abcd',
    maxZoom: 18
}).addTo(map);

let vehicleLayer = L.layerGroup().addTo(map);

// Dane testowe pojazdów (tramwaje + autobusy)
const testVehicles = [
    { lat: 51.7592, lon: 19.4560, line: "13", type: "tramwaj" },
    { lat: 51.7650, lon: 19.4600, line: "75", type: "autobus" },
    { lat: 51.7500, lon: 19.4500, line: "10", type: "tramwaj" },
];

function loadTestVehicles() {
    vehicleLayer.clearLayers();

    testVehicles.forEach(vehicle => {
        const color = vehicle.type === "tramwaj" ? "#ffcc00" : "#00ccff";
        L.circleMarker([vehicle.lat, vehicle.lon], {
            radius: 6,
            color: color,
            fillColor: color,
            fillOpacity: 0.8
        }).addTo(vehicleLayer)
          .bindPopup(`${vehicle.type === "tramwaj" ? "🚋" : "🚌"} Linia ${vehicle.line}`);
    });
}

loadTestVehicles();