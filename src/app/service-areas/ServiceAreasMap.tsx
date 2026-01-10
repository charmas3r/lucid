'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Circle, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with Next.js
const DefaultIcon = L.divIcon({
  className: 'custom-marker',
  html: `
    <div style="
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%);
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: 0 4px 15px rgba(31, 79, 216, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <div style="
        width: 12px;
        height: 12px;
        background: white;
        border-radius: 50%;
        transform: rotate(45deg);
      "></div>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

L.Marker.prototype.options.icon = DefaultIcon;

// San Diego center coordinates
const sanDiegoCenter: [number, number] = [32.7157, -117.1611];

// Service zone configurations
const serviceZones = [
  {
    name: 'Primary Service Zone',
    center: sanDiegoCenter,
    radius: 15000, // 15km radius
    color: '#1F4FD8',
    fillColor: '#1F4FD8',
    fillOpacity: 0.08,
    weight: 2,
  },
  {
    name: 'Extended Service Zone',
    center: sanDiegoCenter,
    radius: 35000, // 35km radius
    color: '#4DA3FF',
    fillColor: '#4DA3FF',
    fillOpacity: 0.05,
    weight: 2,
  },
  {
    name: 'Remote Service Zone',
    center: sanDiegoCenter,
    radius: 60000, // 60km radius
    color: '#3A6EA5',
    fillColor: '#3A6EA5',
    fillOpacity: 0.03,
    weight: 2,
  },
];

// Key locations to mark
const keyLocations = [
  {
    name: 'Lucid Web Studios HQ',
    position: [33.1192, -117.0864] as [number, number],
    description: 'Our Escondido headquarters',
  },
  {
    name: 'La Jolla',
    position: [32.8328, -117.2713] as [number, number],
    description: 'Primary service area',
  },
  {
    name: 'Carlsbad',
    position: [33.1581, -117.3506] as [number, number],
    description: 'Extended service area',
  },
  {
    name: 'Chula Vista',
    position: [32.6401, -117.0842] as [number, number],
    description: 'Extended service area',
  },
  {
    name: 'Escondido',
    position: [33.1192, -117.0864] as [number, number],
    description: 'Extended service area',
  },
];

// Component to set map bounds
function SetMapBounds() {
  const map = useMap();
  
  useEffect(() => {
    // Fit bounds to show all service zones
    const bounds = L.latLngBounds([
      [32.4, -117.6], // Southwest
      [33.4, -116.6], // Northeast
    ]);
    map.fitBounds(bounds, { padding: [20, 20] });
  }, [map]);

  return null;
}

export default function ServiceAreasMap() {
  return (
    <MapContainer
      center={sanDiegoCenter}
      zoom={10}
      style={{ height: '500px', width: '100%' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      
      <SetMapBounds />
      
      {/* Render service zone circles (in reverse order so smaller circles are on top) */}
      {[...serviceZones].reverse().map((zone) => (
        <Circle
          key={zone.name}
          center={zone.center}
          radius={zone.radius}
          pathOptions={{
            color: zone.color,
            fillColor: zone.fillColor,
            fillOpacity: zone.fillOpacity,
            weight: zone.weight,
          }}
        >
          <Popup>
            <div style={{ textAlign: 'center', padding: '8px' }}>
              <strong style={{ color: '#0A1A3F', fontSize: '14px' }}>{zone.name}</strong>
              <p style={{ margin: '4px 0 0', color: '#5A7099', fontSize: '12px' }}>
                ~{Math.round(zone.radius / 1000)} km radius
              </p>
            </div>
          </Popup>
        </Circle>
      ))}

      {/* Key location markers */}
      {keyLocations.map((location) => (
        <Marker key={location.name} position={location.position}>
          <Popup>
            <div style={{ textAlign: 'center', padding: '8px', minWidth: '150px' }}>
              <strong style={{ color: '#0A1A3F', fontSize: '14px', display: 'block', marginBottom: '4px' }}>
                {location.name}
              </strong>
              <span style={{ color: '#5A7099', fontSize: '12px' }}>
                {location.description}
              </span>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
