import React, { useEffect, useState } from 'react';
import { Line } from "react-chartjs-2";
import '../_styles/statCatGermany.css';
import CatAnimation from "@/app/_components/CatAnimation";
import BirdAnimation from "@/app/_components/BirdAnimation";

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
            <CatAnimation numberOfCats={5}/>
            <BirdAnimation numberOfBirds={5}/>
            <div className="full-container">
                <h2 className="header">Anzahl der Hauskatzen in Deutschland</h2>
            </div>
            <div className="full-container">
                <div className="left-stat-container">
                    <h3 className="header">Beliebtheit und Bedeutung</h3>
                    <p>Die Zahl der Katzen in deutschen Haushalten ist von 7 Millionen im Jahr 2000 auf über 15 Millionen im Jahr 2023 gestiegen. Katzen sind über Jahrhunderte aufgrund ihres unabhängigen Charakters und geringen Pflegeaufwands zu einem treuen Begleiter des Menschen geworden. Die Vierbeiner beeinflussen auch zunehmend das Ökosystem, indem sie Nagetiere regulieren, aber auch eine Gefahr für Vögel darstellen. Besonders Streunerkatzen, die in Städten leben, stellen eine Herausforderung für die Biodiversität dar.</p>
                </div>
                <div className="right-stat-container">

                    <h3 className="date">2000 - 2023</h3>

                    <Line data={data} options={options} />

                    <p className="source">Quelle: https://de.statista.com/statistik/daten/studie/30157/umfrage/anzahl-der-haustiere-in-deutschen-haushalten-seit-2008/</p>
                    <br/>
                </div>
            </div>
        </div>
    );
}

export default StatCatGermany;