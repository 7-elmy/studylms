

// import React, { useState } from 'react';

// export default function MapComponent() {
//   const [selectedLocation, setSelectedLocation] = useState(null);
  
//   const locations = [
//     { id: 1, name: "London Bridge", lat: 51.5045, lng: -0.0865, description: "Historic bridge over the Thames" },
//     { id: 2, name: "Big Ben", lat: 51.4994, lng: -0.1245, description: "Iconic clock tower" },
//     { id: 3, name: "London Eye", lat: 51.5033, lng: -0.1196, description: "Giant observation wheel" },
//     { id: 4, name: "Tower Bridge", lat: 51.5055, lng: -0.0754, description: "Victorian bascule bridge" }
//   ];

//   const handleLocationClick = (location) => {
//     setSelectedLocation(location);
//   };

//   return (
//     <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg overflow-hidden relative border-2 border-gray-300 shadow-lg">
//       {/* Map Background */}
//       <div className="absolute inset-0 bg-blue-50 opacity-30"></div>
      
//       {/* Grid pattern to simulate map tiles */}
//       <div className="absolute inset-0 opacity-10">
//         <svg width="100%" height="100%">
//           <defs>
//             <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
//               <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#666" strokeWidth="1"/>
//             </pattern>
//           </defs>
//           <rect width="100%" height="100%" fill="url(#grid)" />
//         </svg>
//       </div>

//       {/* River Thames simulation */}
//       <div className="absolute top-1/2 left-0 right-0 h-8 bg-blue-300 opacity-60 transform -rotate-12 translate-y-4"></div>
      
//       {/* Location markers */}
//       {locations.map((location, index) => (
//         <div
//           key={location.id}
//           className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
//           style={{
//             left: `${20 + index * 20}%`,
//             top: `${30 + (index % 2) * 20}%`
//           }}
//           onClick={() => handleLocationClick(location)}
//         >
//           {/* Marker pin */}
//           <div className="relative">
//             <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg group-hover:bg-red-600 transition-colors duration-200 flex items-center justify-center">
//               <div className="w-3 h-3 bg-white rounded-full"></div>
//             </div>
//             <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-red-500"></div>
            
//             {/* Hover tooltip */}
//             <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
//               {location.name}
//             </div>
//           </div>
//         </div>
//       ))}

//       {/* Control buttons */}
//       <div className="absolute top-4 right-4 flex flex-col gap-2">
//         <button className="w-10 h-10 bg-white border-2 border-gray-300 rounded shadow-md hover:bg-gray-50 flex items-center justify-center font-bold text-lg">
//           +
//         </button>
//         <button className="w-10 h-10 bg-white border-2 border-gray-300 rounded shadow-md hover:bg-gray-50 flex items-center justify-center font-bold text-lg">
//           −
//         </button>
//       </div>

//       {/* Map attribution */}
//       <div className="absolute bottom-2 right-2 text-xs text-gray-600 bg-white bg-opacity-80 px-2 py-1 rounded">
//         Interactive Map Demo
//       </div>

//       {/* Selected location popup */}
//       {selectedLocation && (
//         <div className="absolute top-4 left-4 bg-white border-2 border-gray-300 rounded-lg shadow-lg p-4 max-w-xs z-20">
//           <div className="flex justify-between items-start mb-2">
//             <h3 className="font-bold text-lg text-gray-800">{selectedLocation.name}</h3>
//             <button 
//               onClick={() => setSelectedLocation(null)}
//               className="text-gray-500 hover:text-gray-700 text-xl leading-none"
//             >
//               ×
//             </button>
//           </div>
//           <p className="text-gray-600 text-sm mb-2">{selectedLocation.description}</p>
//           <p className="text-xs text-gray-500">
//             Lat: {selectedLocation.lat}, Lng: {selectedLocation.lng}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }


// import React, { useEffect, useRef, useState } from 'react';

// export default function MapComponent() {
//   const mapRef = useRef(null);
//   const mapInstanceRef = useRef(null);
//   const markersRef = useRef([]);
//   const [mapInfo, setMapInfo] = useState('Loading map...');
//   const [coordinates, setCoordinates] = useState('Loading...');

//   const locations = {
//     london: { lat: 51.505, lng: -0.09, zoom: 13, name: 'London, UK' },
//     paris: { lat: 48.8566, lng: 2.3522, zoom: 13, name: 'Paris, France' },
//     newyork: { lat: 40.7128, lng: -74.0060, zoom: 13, name: 'New York, USA' },
//     tokyo: { lat: 35.6762, lng: 139.6503, zoom: 13, name: 'Tokyo, Japan' },
//     sydney: { lat: -33.8688, lng: 151.2093, zoom: 13, name: 'Sydney, Australia' }
//   };

//   useEffect(() => {
//     // Load Leaflet CSS
//     const link = document.createElement('link');
//     link.rel = 'stylesheet';
//     link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
//     document.head.appendChild(link);

//     // Load Leaflet JS
//     const script = document.createElement('script');
//     script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
//     script.onload = initializeMap;
//     document.head.appendChild(script);

//     return () => {
//       document.head.removeChild(link);
//       document.head.removeChild(script);
//       if (mapInstanceRef.current) {
//         mapInstanceRef.current.remove();
//       }
//     };
//   }, []);

//   const initializeMap = () => {
//     if (mapRef.current && window.L && !mapInstanceRef.current) {
//       // Initialize map
//       const map = window.L.map(mapRef.current).setView([51.505, -0.09], 13);
//       mapInstanceRef.current = map;

//       // Add tile layer
//       window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//         maxZoom: 19
//       }).addTo(map);

//       // Add initial London marker
//       const londonMarker = window.L.marker([51.505, -0.09])
//         .addTo(map)
//         .bindPopup(`
//           <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
//             <h3 style="margin: 0 0 8px 0; color: #1f2937;">London</h3>
//             <p style="margin: 4px 0; color: #6b7280; font-size: 13px;">Capital of England and the United Kingdom</p>
//             <p style="margin: 4px 0; color: #6b7280; font-size: 13px;"><strong>Coordinates:</strong> 51.505°N, 0.09°W</p>
//           </div>
//         `);
//       markersRef.current.push(londonMarker);

//       // Event listeners
//       map.on('moveend', updateCoordinates);
//       map.on('zoomend', updateCoordinates);
//       map.on('click', handleMapClick);

//       // Initial updates
//       updateCoordinates();
//       setMapInfo('Map loaded! Click anywhere to add markers or use the location buttons.');
//     }
//   };

//   const updateCoordinates = () => {
//     if (mapInstanceRef.current) {
//       const center = mapInstanceRef.current.getCenter();
//       const zoom = mapInstanceRef.current.getZoom();
//       setCoordinates(`${center.lat.toFixed(4)}°, ${center.lng.toFixed(4)}° (Zoom: ${zoom})`);
//     }
//   };

//   const handleMapClick = (e) => {
//     const lat = e.latlng.lat.toFixed(4);
//     const lng = e.latlng.lng.toFixed(4);

//     const marker = window.L.marker(e.latlng)
//       .addTo(mapInstanceRef.current)
//       .bindPopup(`
//         <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
//           <h3 style="margin: 0 0 8px 0; color: #1f2937;">Clicked Location</h3>
//           <p style="margin: 4px 0; color: #6b7280; font-size: 13px;">You clicked here!</p>
//           <p style="margin: 4px 0; color: #6b7280; font-size: 13px;"><strong>Coordinates:</strong> ${lat}°, ${lng}°</p>
//         </div>
//       `)
//       .openPopup();

//     markersRef.current.push(marker);
//     setMapInfo(`Marker added at ${lat}°, ${lng}°`);
//   };

//   const goToLocation = (locationKey) => {
//     const location = locations[locationKey];
//     if (location && mapInstanceRef.current) {
//       mapInstanceRef.current.setView([location.lat, location.lng], location.zoom);
//       setMapInfo(`Viewing: ${location.name}`);

//       // Check if marker already exists at this location
//       const existingMarker = markersRef.current.find(m => {
//         const markerPos = m.getLatLng();
//         return Math.abs(markerPos.lat - location.lat) < 0.001 && 
//                Math.abs(markerPos.lng - location.lng) < 0.001;
//       });

//       if (!existingMarker) {
//         const marker = window.L.marker([location.lat, location.lng])
//           .addTo(mapInstanceRef.current)
//           .bindPopup(`
//             <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
//               <h3 style="margin: 0 0 8px 0; color: #1f2937;">${location.name}</h3>
//               <p style="margin: 4px 0; color: #6b7280; font-size: 13px;"><strong>Coordinates:</strong> ${location.lat.toFixed(3)}°, ${location.lng.toFixed(3)}°</p>
//             </div>
//           `);
//         markersRef.current.push(marker);
//       }
//     }
//   };

//   const addRandomMarker = () => {
//     if (mapInstanceRef.current) {
//       const bounds = mapInstanceRef.current.getBounds();
//       const lat = bounds.getSouth() + Math.random() * (bounds.getNorth() - bounds.getSouth());
//       const lng = bounds.getWest() + Math.random() * (bounds.getEast() - bounds.getWest());

//       const marker = window.L.marker([lat, lng])
//         .addTo(mapInstanceRef.current)
//         .bindPopup(`
//           <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
//             <h3 style="margin: 0 0 8px 0; color: #1f2937;">Random Location</h3>
//             <p style="margin: 4px 0; color: #6b7280; font-size: 13px;">A randomly placed marker</p>
//             <p style="margin: 4px 0; color: #6b7280; font-size: 13px;"><strong>Coordinates:</strong> ${lat.toFixed(4)}°, ${lng.toFixed(4)}°</p>
//           </div>
//         `);

//       markersRef.current.push(marker);
//       setMapInfo(`Added random marker at ${lat.toFixed(4)}°, ${lng.toFixed(4)}°`);
//     }
//   };

//   const clearMarkers = () => {
//     if (mapInstanceRef.current) {
//       markersRef.current.forEach(marker => {
//         mapInstanceRef.current.removeLayer(marker);
//       });
//       markersRef.current = [];
//       setMapInfo('All markers cleared');
//     }
//   };

//   return (
//     <div className="w-full  mx-auto p-4 bg-gray-50 min-h-screen">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Interactive React Map</h1>
      
//       {/* Controls */}
//       <div className="mb-4 flex flex-wrap gap-2 justify-center">
//         {Object.entries(locations).map(([key, location]) => (
//           <button
//             key={key}
//             onClick={() => goToLocation(key)}
//             className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm font-medium"
//           >
//             {location.name}
//           </button>
//         ))}
//         <button
//           onClick={addRandomMarker}
//           className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 text-sm font-medium"
//         >
//           Add Random Marker
//         </button>
//         <button
//           onClick={clearMarkers}
//           className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 text-sm font-medium"
//         >
//           Clear Markers
//         </button>
//       </div>

//       {/* Map Container */}
//       <div 
//         ref={mapRef} 
//         className="w-full h-96 lg:h-[500px] rounded-lg shadow-lg border-2 border-gray-300 bg-gray-100"
//         style={{ minHeight: '400px' }}
//       />

//     </div>
//   );
// }


import React, { useEffect, useRef } from 'react';

import { useTranslation } from 'react-i18next';

export default function MapComponent() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // Load Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
    document.head.appendChild(link);

    // Load Leaflet JS
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
    script.onload = initializeMap;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(script);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
    };
  }, []);

  const initializeMap = () => {
    if (mapRef.current && window.L && !mapInstanceRef.current) {
      // London coordinates
      const london = { lat: 51.505, lng: -0.09, zoom: 13 };
      
      // Initialize map centered on London
      const map = window.L.map(mapRef.current).setView([london.lat, london.lng], london.zoom);
      mapInstanceRef.current = map;

      // Add tile layer
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(map);

      // Add London marker
      window.L.marker([london.lat, london.lng])
        .addTo(map)
        .bindPopup(`
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <h3 style="margin: 0 0 8px 0; color: #1f2937;">London</h3>
            <p style="margin: 4px 0; color: #6b7280; font-size: 13px;">Capital of England and the United Kingdom</p>
            <p style="margin: 4px 0; color: #6b7280; font-size: 13px;"><strong>Coordinates:</strong> 51.505°N, 0.09°W</p>
          </div>
        `)
        .openPopup();
    }
  };

  return (
    <div className="w-full mx-auto p-4">
      {/* <h1 className="text-2xl font-bold text-gray-800 mb-4">London Map</h1> */}
      <div 
        ref={mapRef} 
        className="w-full z-5 h-96 rounded-lg shadow-lg border border-gray-300"
      />
    </div>
  );
}





export  function ClickableMapText() {
  let { t, i18n } = useTranslation();
  // Location data
  const location = {
    name: "London",
    lat: 51.505,
    lng: -0.09
  };

  // Function to open Google Maps
  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps?q=${location.lat},${location.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className=" max-w-md mx-auto">
      {/* Simple clickable text */}
   


      {/* Simple link style */}
      <div className="">
        <a 
          href={`https://www.google.com/maps?q=${location.lat},${location.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-yellow-600 hover:text-yellow-800 underline hover:no-underline transition-all duration-200"
        >
          {i18n.language=="ar"? "شاهد موقعنا" :"view location"} 
        </a>
      </div>

      {/* Address-style clickable text
      <div className="mt-6 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-1">Address:</p>
        <div 
          onClick={openGoogleMaps}
          className="text-gray-800 hover:text-blue-600 cursor-pointer transition-colors duration-200 font-medium"
        >
          Central London, UK
          <br />
          <span className="text-sm text-gray-500">Click to view on map</span>
        </div>
      </div> */}
    </div>
  );
}