document.addEventListener("DOMContentLoaded", function() {
    // Initialize the map
    const map = L.map('map', {
        minZoom: 7.5,
        maxZoom: 15,
        zoomSnap: 0.25,
        zoomControl: false
    }).setView(center=[46.8182, 8.2275], zoom=7.5);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {
	    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  })