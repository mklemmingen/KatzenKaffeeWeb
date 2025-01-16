import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "../../globals.css";
import Image from "next/image";

function StatCatGlobal() {
    const countries = ["Russland", "Deutschland", "Frankreich", "Gesamt Europa"];
    const catPopulations = [23.3, 15.2, 14.9, 129.0];

    const [primaryColor, setPrimaryColor] = useState("");

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
        <div>
            <div>
                <div className="full-container-headline">
                    <Image src="assets/svg/world-svgrepo-com.svg" alt="Icon" width={50} height={50} />
                    <h2>Katzenpopulation in Europa</h2>
                    <h2 className="author"> Michael </h2>
                </div>
                <p>
                    Die größte Katzenpopulation Europas wurde im Jahr 2022 in <b>Russland</b> gezählt, wo etwa <b>23,3 Millionen</b> Katzen lebten.{" "}
                    <b>Deutschland</b> belegte den zweiten Platz mit einer geschätzten Katzenpopulation von <b>15,2 Millionen</b> Tieren. Auf dem
                    dritten Platz folgte <b>Frankreich</b> mit schätzungsweise <b>14,9 Millionen</b> Katzen. Insgesamt leben in den betrachteten
                    europäischen Ländern über <b>129 Millionen</b> Katzen.
                </p>
                <br />
                <h3>Katzenpopulation 2022</h3>

                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="country" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} domain={[0, 140]} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(0, 0, 0, 0.8)",
                                color: "#fff",
                                border: `2px solid ${primaryColor}`,
                            }}
                            labelStyle={{ color: "#fff" }}
                        />
                        <Legend wrapperStyle={{ fontSize: 12 }} />
                        <Bar dataKey="population" fill={primaryColor} barSize={50} />
                    </BarChart>
                </ResponsiveContainer>

                <p className="source">
                    Quelle: https://de.statista.com/statistik/daten/studie/454087/umfrage/katzen-in-europa-nach-laendern/ (Quelle ersetzen)
                </p>
                <br />
            </div>
        </div>
    );
}

export default StatCatGlobal;