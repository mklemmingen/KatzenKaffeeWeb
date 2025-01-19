import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "../../globals.css";
import "../../_styles/statCatGlobal.css";
import Image from "next/image";
import MapComponent from "@/app/_components/MapComponent";
import { FaMousePointer } from "react-icons/fa";

// This code is the original one from Michael. I managed to downgrade to React18 from React19
// so we can use his implementation of MapComponent.js
// The React19 OpenStreetMap implementation is in MapComponent2.js

function StatCatGlobal() {
    const countries = ["Germany", "France", "Italy", "Poland", "Spain", "Netherlands", "Belgium", "Austria", "Portugal", "Sweden", "Denmark", "Greece", "Croatia"];
    const catPopulations = [15.2, 14.9, 10.2, 7.25, 5.8, 3, 2.5, 2, 1.95, 1.7, 0.7, 0.6, 0.43];

    const [primaryColor, setPrimaryColor] = useState("");
    const [activeTab, setActiveTab] = useState("map"); // Default ist die Map-Ansicht

    useEffect(() => {
        const primaryColor = getComputedStyle(document.documentElement)
            .getPropertyValue("--primary-color")
            .trim();
        setPrimaryColor(primaryColor || "#8884d8"); // Default color if --primary-color is not set
    }, []);

    const data = countries.map((country, index) => ({
        country,
        population: catPopulations[index],
    }));

    return (
        <>
            <div>
                <div className="full-container-headline">
                    <Image src="assets/svg/world-svgrepo-com.svg" alt="Icon" width={50} height={50} />
                    <h2>Katzenpopulation in Europa</h2>
                    <p className="author">Michael</p>
                </div>
                <p>
                    Die größte Katzenpopulation Europas wurde im Jahr 2022 in <b>Russland</b> gezählt, wo etwa <b>23,3 Millionen</b> Katzen lebten.{" "}
                    <b>Deutschland</b> belegte den zweiten Platz mit einer geschätzten Katzenpopulation von <b>15,2 Millionen</b> Tieren. Auf dem
                    dritten Platz folgte <b>Frankreich</b> mit schätzungsweise <b>14,9 Millionen</b> Katzen. Insgesamt leben in den betrachteten
                    europäischen Ländern über <b>129 Millionen</b> Katzen.
                </p>
                <br />
                <h2>Katzenpopulation 2022</h2>

                {/* Tabs */}
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

                <div>
                    {/* Hover Infobox */}
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
                        <span style={{fontSize: "12px"}}>Fahre mit der Maus über die Länder, um mehr zu erfahren.</span>
                    </div>
                </div>

                {/* Bedingte Anzeige der Visualisierung */}
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
                    <MapComponent/>
                    // <MapComponent countries={countries} catPopulations={catPopulations} />
                )}

                <p className="source" style={{fontSize: "12px", paddingTop: "15px"}}>
                    Quelle: Anzahl der Katzen in Europa nach Ländern im Jahr 2022 (in 1.000 Tieren) [Graph], FEDIAF, 15. Juni, 2024. [Online].
                </p>
                <br />
            </div>
        </>
    );
}

export default StatCatGlobal;
