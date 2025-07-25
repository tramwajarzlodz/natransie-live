const map = L.map('map').setView([51.7592, 19.4560], 13); // Centrum Łodzi
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap',
    maxZoom: 18
}).addTo(map);

let vehicleLayer = L.layerGroup().addTo(map);

async function fetchVehicles() {
    try {
        const response = await fetch("https://transit.land/api/v2/rest/vehicles?operator_onestop_id=o-u3jy-mpklodz");
        const data = await response.json();

        vehicleLayer.clearLayers();

        data.vehicles.forEach(vehicle => {
            if (vehicle.geometry && vehicle.trip && vehicle.trip.route_name) {
                const { coordinates } = vehicle.geometry;
                const line = vehicle.trip.route_name;

                L.circleMarker([coordinates[1], coordinates[0]], {
                    radius: 6,
                    color: "#ffcc00",
                    fillColor: "#ffcc00",
                    fillOpacity: 0.8
                }).addTo(vehicleLayer)
                  .bindPopup(`Linia ${line}`);
            }
        });
    } catch (e) {
        console.error("Błąd ładowania danych:", e);
    }
}

fetchVehicles();
setInterval(fetchVehicles, 10000); // Odświeżaj co 10 sekund