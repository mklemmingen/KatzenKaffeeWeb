import React, { useEffect, useState } from 'react';
import { Line } from "react-chartjs-2";

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

    const data = {
        labels: years,
        datasets: [
            {
                label: "Anzahl der Katzen",
                data: cats,
                borderColor: primaryColor,
                backgroundColor: "rgba(129, 104, 142, 0.5)",
                fill: true,
                borderWidth: 2,
                borderDash: [2, 2],
                pointRadius: 6,
                pointBackgroundColor: "rgba(129, 104, 142, 1)",
                pointBorderColor: primaryColor,
                pointBorderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: { display: false, text: "" },
            tooltip: {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                titleColor: "#fff",
                bodyColor: "#fff",
                borderColor: "rgba(129, 104, 142, 1)",
                borderWidth: 2,
            },
            legend: {
                position: "bottom",
                align: "start",
            },
        },
    };

    return (
        <div>
            <div>
                <h2 className="header">Anzahl der Hauskatzen in Deutschland</h2>
                <p>Die Zahl der Katzen in deutschen Haushalten ist von <b>7 Millionen</b> im Jahr 2000 auf über <b>15 Millionen</b> im Jahr 2023 gestiegen. Katzen sind über Jahrhunderte aufgrund ihres unabhängigen Charakters und geringen Pflegeaufwands zu einem treuen Begleiter des Menschen geworden. Die Vierbeiner beeinflussen auch zunehmend das Ökosystem, indem sie Nagetiere regulieren, aber auch eine Gefahr für Vögel darstellen. Besonders Streunerkatzen, die in Städten leben, stellen eine Herausforderung für die <b>Biodiversität</b> dar.</p>
                <br/>
                <h3 className="header">Entwicklung 2000 - 2023</h3>

                <Line data={data} options={options} />

                <p className="source">Quelle: https://de.statista.com/statistik/daten/studie/30157/umfrage/anzahl-der-haustiere-in-deutschen-haushalten-seit-2008/ (Quelle ersetzen)</p>
                <br/>
        </div>
        </div>
    );
}

export default StatCatGermany;