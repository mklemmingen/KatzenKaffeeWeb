import React, { useEffect, useState } from 'react';
import { Bar } from "react-chartjs-2";

function StatCatGlobal() {
    const countries = ["Russland", "Deutschland", "Frankreich", "Gesamt Europa"];
    const catPopulations = [23300000, 15200000, 14900000, 129000000];

    const [primaryColor, setPrimaryColor] = useState('');

    useEffect(() => {
        const primaryColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--primary-color')
            .trim();
        setPrimaryColor(primaryColor);
    }, []);

    const data = {
        labels: countries,
        datasets: [
            {
                label: "Katzenpopulation (in Millionen)",
                data: catPopulations,
                backgroundColor: [
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
                    "rgba(255, 159, 64, 0.6)",
                    "rgba(54, 162, 235, 0.6)"
                ],
                borderColor: primaryColor,
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Katzenpopulation in Europa (2022)",
            },
            tooltip: {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                titleColor: "#fff",
                bodyColor: "#fff",
                borderColor: "rgba(153, 102, 255, 1)",
                borderWidth: 2,
            },
            legend: {
                position: "bottom",
                align: "center",
            },
        },
    };

    return (
        <div>
            <div>
                <h2 className="header">Vergleich der Katzenpopulation in Europa</h2>
                <h2> Michael </h2>
                <p>Die größte Katzenpopulation Europas wurde im Jahr 2022 in <b>Russland</b> gezählt, wo etwa <b>23,3
                    Millionen</b> Katzen lebten. <b>Deutschland</b> belegte den zweiten Platz mit einer geschätzten
                    Katzenpopulation von <b>15,2 Millionen</b> Tieren. Auf dem dritten Platz
                    folgte <b>Frankreich</b> mit schätzungsweise <b>14,9 Millionen</b> Katzen.
                    Insgesamt leben in den betrachteten europäischen Ländern über <b>129 Millionen</b> Katzen.</p>
                <br/>
                <h3 className="header">Katzenpopulation 2022</h3>

                <Bar data={data} options={options}/>

                <p className="source">Quelle:
                    https://de.statista.com/statistik/daten/studie/454087/umfrage/katzen-in-europa-nach-laendern/
                    (Quelle ersetzen)</p>
                <br/>
            </div>
        </div>
    );
}

export default StatCatGlobal;
