import React, {useEffect, useState} from 'react';
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import '../../globals.css';
import Image from "next/image";
import CustomizedDot from "../../_components/CustomizedDot";

function StatCatGermany() {
    const years = [
        2000, 2004, 2006, 2008, 2010, 2012, 2014, 2016, 2018, 2020, 2022, 2023,
    ];

    const cats = [
        6800000, 7300000, 7800000, 8200000, 8200000, 12300000, 11800000,
        13400000, 14800000, 15700000, 15200000, 15700000,
    ];

    const [primaryColor, setPrimaryColor] = useState('');

    useEffect(() => {
        const primaryColor = getComputedStyle(document.documentElement)
            .getPropertyValue("--primary-color")
            .trim();
        setPrimaryColor(primaryColor || "#8884d8"); // Default color if --primary-color is not set
    }, []);

    const chartData = years.map((year, index) => ({
        year,
        cats: cats[index],
    }));

    return (
        <>
            <div>
                <div className="full-container-headline">
                    <Image src='assets/svg/berlin-brandenburg-gate-svgrepo-com.svg' alt="Icon" width={50} height={50} />
                    <h2>Hauskatzen in Deutschland</h2>
                    <p className="author"> Michael </p>
                </div>
                <p> Die Zahl der Katzen in deutschen Haushalten stieg von <b>7 Millionen</b> im Jahr 2000 auf über <b>15 Millionen</b> im Jahr 2023. Dank ihres unabhängigen Charakters und geringen Pflegeaufwands sind sie beliebte Haustiere. Katzen regulieren Nagetiere, stellen jedoch eine Gefahr für Vögel und andere Tiere dar, insbesondere Streunerkatzen, die eine Gefahr für die <b>Biodiversität</b> bedeuten.</p>
                <br />
                <h2>Entwicklung 2000 - 2023</h2>

                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="2 2" />
                        <XAxis
                            dataKey="year"
                            tick={{ fontSize: 10 }}
                        />
                        <YAxis
                            label={{ value: 'Anzahl der Katzen', angle: -90, position: 'insideLeft', style: { fontSize: 10 } }}
                            tick={{ fontSize: 10 }}
                            domain={[0, 'dataMax']}
                        />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="cats"
                            stroke={primaryColor}
                            strokeWidth={3}
                            dot={{ r: 8, fill: "rgba(129, 104, 142, 1)", stroke: primaryColor, strokeWidth: 2 }}
                            activeDot={<CustomizedDot radius={45}/>}
                        />
                        
                    </LineChart>
                </ResponsiveContainer>

                <p className="source" style={{fontSize: "12px", paddingTop: "15px"}}>Quelle:
                Anzahl der Haustiere in deutschen Haushalten nach Tierarten in den Jahren 2000 bis 2023 (in Millionen) [Graph], ZZF, 16. April, 2024. [Online].
                </p>
                <br />
            </div>
        </>
    );
}

export default StatCatGermany;