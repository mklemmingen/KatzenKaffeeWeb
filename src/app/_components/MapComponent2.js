"use client";

import {useEffect, useRef, useState} from "react";
import { MapContainer, TileLayer, Circle, Tooltip as MapTooltip } from "react-leaflet";
import 'leaflet/dist/leaflet.css';

function MapComponent2({colorScale }) {

        const countriesData = [
        { name: "Germany", lat: 51.1657, lng: 10.4515, population: 15.2 },
        { name: "France", lat: 46.6034, lng: 1.8883, population: 14.9 },
        { name: "Italy", lat: 41.8719, lng: 12.5674, population: 10.2 },
        { name: "Poland", lat: 51.9194, lng: 19.1451, population: 7.25 },
        { name: "Spain", lat: 40.4637, lng: -3.7492, population: 5.8 },
        { name: "Netherlands", lat: 52.1326, lng: 5.2913, population: 3 },
        { name: "Belgium", lat: 50.5039, lng: 4.4699, population: 2.5 },
        { name: "Austria", lat: 47.5162, lng: 14.5501, population: 2 },
        { name: "Portugal", lat: 39.3999, lng: -8.2245, population: 1.95 },
        { name: "Sweden", lat: 60.1282, lng: 18.6435, population: 1.7 },
        { name: "Denmark", lat: 56.2639, lng: 9.5018, population: 0.7 },
        { name: "Greece", lat: 39.0742, lng: 21.8243, population: 0.6 },
        { name: "Croatia", lat: 45.1, lng: 15.2, population: 0.43 }
    ];

    useEffect(() => {
        return () => {
            const map = document.querySelector('.leaflet-container');
            if (map !== undefined) {
                return () => map.remove();
            }
        };
    }, []);

    return (
        <MapContainer
            key={countriesData.length} // Key used for reinit
            center={[50, 10]}
            zoom={4}
            style={{ height: "400px", width: "100%" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            />
            {countriesData.map(({ name, lat, lng, population }) => (
                <Circle
                    key={name}
                    center={[lat, lng]}
                    radius={population * 10000}
                    fillColor={colorScale(population)}
                    color={colorScale(population)}
                    fillOpacity={0.6}
                >
                    <MapTooltip direction="top" offset={[0, -10]}>
                        <div>
                            <strong>{name}</strong>
                            <br />
                            Population: {population}M
                        </div>
                    </MapTooltip>
                </Circle>
            ))}
        </MapContainer>
    );
}

export default MapComponent2;