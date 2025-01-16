import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../../globals.css';
import Image from "next/image";

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
            .getPropertyValue('--primary-color')
            .trim();
        setPrimaryColor(primaryColor);
    }, []);

    // Combine data for Recharts
    const chartData = years.map((year, index) => ({
        year,
        cats: cats[index],
    }));

    return (
        <div>
            <div>
                <div className="full-container-headline">
                    <Image src='assets/svg/berlin-brandenburg-gate-svgrepo-com.svg' alt="Icon" width={50} height={50} />
                    <h2>Hauskatzen in Deutschland</h2>
                    <h2 className="author"> Michael </h2>
                </div>
                <p>
                    Die Zahl der Katzen in deutschen Haushalten ist von <b>7 Millionen</b> im Jahr 2000 auf über <b>15
                    Millionen</b> im Jahr 2023 gestiegen. Katzen sind über Jahrhunderte aufgrund ihres unabhängigen
                    Charakters und geringen Pflegeaufwands zu einem treuen Begleiter des Menschen geworden. Die
                    Vierbeiner beeinflussen auch zunehmend das Ökosystem, indem sie Nagetiere regulieren, aber auch eine
                    Gefahr für Vögel darstellen. Besonders Streunerkatzen, die in Städten leben, stellen eine
                    Herausforderung für die <b>Biodiversität</b> dar.
                </p>
                <br />
                <h2>Entwicklung 2000 - 2023</h2>

                {/* Recharts Line Chart */}
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="year"
                            label={{ value: 'Jahr', position: 'insideBottom', offset: -5 }}
                            tick={{ fontSize: 12 }} // Smaller font for ticks
                        />
                        <YAxis
                            label={{ value: 'Anzahl der Katzen', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
                            tick={{ fontSize: 12 }} // Smaller font for ticks
                            domain={[0, 'dataMax']} // Start from 0
                        />
                        <Tooltip />
                        <Legend verticalAlign="top" height={36} />
                        <Line
                            type="monotone"
                            dataKey="cats"
                            stroke={primaryColor}
                            strokeWidth={2}
                            dot={{ r: 6, fill: "rgba(129, 104, 142, 1)", stroke: primaryColor, strokeWidth: 2 }}
                            activeDot={{ r: 8 }}
                        />
                    </LineChart>
                </ResponsiveContainer>

                <p className="source">Quelle:
                    https://de.statista.com/statistik/daten/studie/30157/umfrage/anzahl-der-haustiere-in-deutschen-haushalten-seit-2008/
                </p>
                <br />
            </div>
        </div>
    );
}

export default StatCatGermany;