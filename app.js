const map = L.map('map').setView([51.7592, 19.4560], 13); // Centrum Łodzi

// Alternatywny, bardziej niezawodny styl OpenStreetMap (działa na GitHub Pages)
L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19
}).addTo(map);

let vehicleLayer = L.layerGroup().addTo(map);

// Dane testowe pojazdów (tramwaje + autobusy)
const testVehicles = [
    { lat: 51.7592, lon: 19.4560, line: "13", type: "Tramwaj" },
    { lat: 51.7650, lon: 19.4600, line: "75", type: "Autobus" },
    { lat: 51.7500, lon: 19.4500, line: "10", type: "Tramwaj" },
];

function loadTestVehicles() {
    vehicleLayer.clearLayers();

    testVehicles.forEach(vehicle => {
        const color = vehicle.type === "Tramwaj" ? "#FFD700" : "#1E90FF"; // żółty / niebieski
        const icon = L.divIcon({
            className: 'custom-icon',
            html: `<div style="background:${color};color:black;padding:2px 4px;border-radius:4px;font-weight:bold;font-size:12px;">${vehicle.line}</div>`,
            iconSize: [30, 16],
            iconAnchor: [15, 8]
        });

        L.marker([vehicle.lat, vehicle.lon], { icon: icon })
         .addTo(vehicleLayer)
         .bindPopup(`${vehicle.type} linii ${vehicle.line}`);
    });
}

loadTestVehicles();