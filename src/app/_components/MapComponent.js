"use client";

import React, {useState} from "react";
import {ComposableMap, Geographies, Geography} from "react-simple-maps";
import {Cell, Pie, PieChart, ResponsiveContainer} from "recharts";

const geoUrl = "/assets/custom-map.json";

const countries = ["Germany", "France", "Italy", "Poland", "Spain", "Netherlands", "Belgium", "Austria", "Portugal", "Sweden", "Denmark", "Greece", "Croatia"];
const catPopulations = [15.2, 14.9, 10.2, 7.25, 5.8, 3, 2.5, 2, 1.95, 1.7, 0.7, 0.6, 0.43];

const maxPopulation = Math.max(...catPopulations);
const minPopulation = Math.min(...catPopulations);

// RGB der Map-Farben
const colorStart = { r: 93, g: 65, b: 90 }; // #5D415A
const colorEnd = { r: 142, g: 68, b: 173 }; // #8E44AD

const getColorForPopulation = (population) => {
  const ratio = (population - minPopulation) / (maxPopulation - minPopulation);
  const r = Math.floor(colorStart.r + ratio * (colorEnd.r - colorStart.r));
  const g = Math.floor(colorStart.g + ratio * (colorEnd.g - colorStart.g));
  const b = Math.floor(colorStart.b + ratio * (colorEnd.b - colorStart.b));
  return `rgb(${r}, ${g}, ${b})`;
};

// const MapComponent = ({ countries, catPopulations }) => {
const MapComponent = () => {
  const [activeCountry, setActiveCountry] = useState(null);
  const [population, setPopulation] = useState(null);

  const getPopulation = (countryName) => {
    const index = countries.indexOf(countryName);
    return index >= 0 ? catPopulations[index] : null;
  };

  // Summe Katzen
  const totalPopulation = catPopulations.reduce((total, pop) => total + pop, 0);

  // Anteile für das Kreisdiagramm berechnen
  const pieData = countries.map((country, index) => ({
    name: country,
    value: catPopulations[index],
    fill: country === activeCountry ? getColorForPopulation(population) : "#ddd",
  }));

  return (
    <div>
      {/* Infobox für aktives Land */}
      {activeCountry && population !== null && (
        <div
          style={{
            position: "absolute",
            backgroundColor: "#f5f5f5",
            padding: "15px",
            borderRadius: "10px",
            boxShadow: "0 3px 3px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
          }}
        >
          <h3>{activeCountry}</h3>
          <p style={{ marginBottom: "10px" }}>{population} Millionen Katzen</p>
          {/* Kreisdiagramm */}
          <ResponsiveContainer width={125} height={125}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                innerRadius={40} // Innenradius für das Donut-Design
                outerRadius={60} // Außenradius
                startAngle={90}
                endAngle={450}
                animationDuration={0} // Animation sofort beenden
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      <ComposableMap
        projectionConfig={{
          scale: 1250,
          center: [9, 50],
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryName = geo.properties.name;
              const population = getPopulation(countryName);
              // Bestimme die Farbe des Landes basierend auf der Population
              const fillColor = population ? getColorForPopulation(population) : "#f5f5f5";

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={fillColor}
                  stroke="#FFFFFF"
                  style={{
                    hover: {
                      fill: "#8E44AD", // Hover
                    },
                  }}
                  onMouseEnter={() => {
                    setActiveCountry(countryName);
                    setPopulation(population);
                  }}
                  onMouseLeave={() => {
                    setActiveCountry(null);
                    setPopulation(null);
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default MapComponent;