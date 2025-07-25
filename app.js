const map = L.map('map').setView([51.7592, 19.4560], 13);

// Działająca mapa MapTiler (basic-v2)
L.tileLayer('https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=lFkbk0zKWfSI0GJZZnOP', {
    attribution: '&copy; <a href="https://www.maptiler.com/">MapTiler</a> & OpenStreetMap contributors',
    tileSize: 512,
    zoomOffset: -1,
    maxZoom: 20
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
                const type = vehicle.vehicle_type || "Pojazd";

                const color = type.toLowerCase().includes("tram") ? "#FFD700" : "#1E90FF";

                const icon = L.divIcon({
                    className: 'custom-icon',
                    html: `<div style="background:${color};color:black;padding:2px 4px;border-radius:4px;font-weight:bold;font-size:12px;">${line}</div>`,
                    iconSize: [30, 16],
                    iconAnchor: [15, 8]
                });

                L.marker([coordinates[1], coordinates[0]], { icon: icon })
                 .addTo(vehicleLayer)
                 .bindPopup(`${type} linii ${line}`);
            }
        });
    } catch (error) {
        console.error("Błąd podczas pobierania pojazdów:", error);
    }
}

fetchVehicles();
setInterval(fetchVehicles, 15000); // Odświeżaj co 15 sekund