import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { MapContainer, TileLayer, Circle, Tooltip as MapTooltip } from "react-leaflet"; // Marty: Rewrote so it uses React19, yw
import "leaflet/dist/leaflet.css";
import '@/app/globals.css';
import '@/app/_styles/statCatGlobal.css';
import Image from "next/image";
import { FaMousePointer } from "react-icons/fa";
import * as d3 from "d3"; // Marty: Gradient colors

function StatCatGlobal() {
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

    const [primaryColor, setPrimaryColor] = useState("");
    const [activeTab, setActiveTab] = useState("map");

    useEffect(() => {
        const primaryColor = getComputedStyle(document.documentElement)
            .getPropertyValue("--primary-color")
            .trim();
        setPrimaryColor(primaryColor || "#8884d8");
    }, []);

    const data = countriesData.map(({ name, population }) => ({
        country: name,
        population,
    }));

    // Creating a color scale using D3 (Marty)
    const colorScale = d3.scaleSequential()
        // Domain based on min and max population
        .domain([0, d3.max(countriesData, d => d.population)])
        // Gradient from middle purple to dark purple
        .interpolator(d3.interpolateRgb("#9370DB", "#4B0082"));

    return (
        <div>
            <div className="full-container-headline">
                <Image src="assets/svg/world-svgrepo-com.svg" alt="Icon" width={50} height={50} />
                <h2>Katzenpopulation in Europa</h2>
                <h2 className="author">Michael (& Marty)</h2>
            </div>
            <p>
                Die größte Katzenpopulation Europas wurde im Jahr 2022 in <b>Russland</b> gezählt, wo etwa <b>23,3 Millionen</b> Katzen lebten. <b>Deutschland</b> belegte den zweiten Platz mit einer geschätzten Katzenpopulation von <b>15,2 Millionen</b> Tieren. Auf dem dritten Platz folgte <b>Frankreich</b> mit schätzungsweise <b>14,9 Millionen</b> Katzen. Insgesamt leben in den betrachteten europäischen Ländern über <b>129 Millionen</b> Katzen.
            </p>
            <br />
            <h2>Katzenpopulation 2022</h2>

            <div className="tabs">
                <button
                    className={activeTab === 'map' ? 'active' : ''}
                    onClick={() => setActiveTab('map')}>Interaktive Map / Karte
                </button>
                <button
                    className={activeTab === 'barChart' ? 'active' : ''}
                    onClick={() => setActiveTab('barChart')}>Balkendiagramm
                </button>
            </div>

            <div
                style={{
                    maxWidth: "275px",
                    position: "absolute",
                    backgroundColor: "#f5f5f5",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    boxShadow: "0 3px 3px rgba(0, 0, 0, 0.1)",
                    zIndex: 1000,
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    right: 0,
                }}
            >
                <FaMousePointer style={{ marginRight: "10px", fontSize: "18px" }} />
                <span style={{ fontSize: "12px" }}>Fahre mit der Maus über die Länder, um mehr zu erfahren.</span>
            </div>

            {activeTab === 'barChart' && (
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="2 2" />
                        <XAxis dataKey="country" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} domain={[0, 20]} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#f5f5f5",
                                border: `2px solid ${primaryColor}`,
                            }}
                        />
                        <Legend wrapperStyle={{ fontSize: 12 }} />
                        <Bar dataKey="population" fill={primaryColor} barSize={35} />
                    </BarChart>
                </ResponsiveContainer>
            )}

            {activeTab === 'map' && (
                <MapContainer center={[50, 10]} zoom={4} style={{ height: "400px", width: "100%" }}>
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
            )}

            <p className="source" style={{ fontSize: "12px", paddingTop: "15px" }}>
                Quelle: Anzahl der Katzen in Europa nach Ländern im Jahr 2022 (in 1.000 Tieren) [Graph], FEDIAF, 15. Juni, 2024. [Online].
            </p>
            <br />
        </div>
    );
}

export default StatCatGlobal;