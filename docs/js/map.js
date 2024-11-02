document.addEventListener("DOMContentLoaded", function() {
    // Initialize the map
    const map = L.map('map', {
        minZoom: 7.65,
        maxZoom: 15,
        zoomSnap: 0.1,
        zoomControl: false
    }).setView(center=[46.85, 8.2275], zoom=7.65);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Load Switzerland borders from local GeoJSON file
    fetch('/assets/switzerland.geojson')
        .then(response => response.json())
        .then(geojson => {
            // Create the inverted mask
            L.geoJSON({
                type: "FeatureCollection",
                features: [{
                    type: "Feature",
                    geometry: {
                        type: "Polygon",
                        coordinates: [
                            [ // Outer bounds covering the map
                                [-90, -180],
                                [90, -180],
                                [90, 180],
                                [-90, 180]    
                            ],
                            // Inner bounds that cuts out Switzerland
                            ...geojson.features.map(f => f.geometry.coordinates).flat()
                        ]
                    }
                }]
            }, {
                style: {
                    fillColor: "#000", // Dark color for fill
                    fillOpacity: 0.4, // Semi-transparent fill
                    weight: 0, // No border
                }
            }).addTo(map);
        })
        .catch(error => console.error('Error loading Switzerland GeoJSON:', error));

    // Add northern-most and southern-most markers
    L.marker([47.808264, 8.567897]).addTo(map); // N
    L.marker([45.818031, 9.016483]).addTo(map); // S

    // Load the KML file and add the route to the map
    omnivore.kml('/assets/suggested_route.kml')
        .on('ready', function(e) {
            this.eachLayer(function(layer) {
                layer.setStyle({
                    color: '#cd1c18',       // Color of the line
                    weight: 3,           // Thickness of the line
                    opacity: 1.0,        // Opacity of the line
                });
            });
        })
        .addTo(map);
});