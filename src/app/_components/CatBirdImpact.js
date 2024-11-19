import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import "../globals.css";
import "../_styles/CatHuntingImpact.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const CatHuntingImpact = () => {
    const data = {
        labels: ['Hauskatzen', 'Rotfüchse', 'Rotschwanzbussarde', 'Virginia-Opossums'],
        datasets: [{
            label: 'Anzahl getöteter Tiere',
            data: [75, 15, 4, 3],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40']
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: {
                        size: 14
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.raw !== null) {
                            label += context.raw;
                        }
                        return label;
                    }
                }
            }
        }
    };

    return (
        <div className="chart-container">
            <h2 className="pre-titel">Der Einfluss von Raubtieren auf die Tierwelt</h2>
            <Pie data={data} options={options}/>
            <p className="title">Welches Tier jagt am meisten?</p>
            <p className="description">Es wurde jeweils die gleiche Anzahl an Raubtieren
                je Gattung verfolgt, um die Anzahl an erfolgreichen
                Jagden zu vergleichen.
            </p>
            <p className="description">
                Standort: Washington D.C., USA
            </p>
            <p className="source">Quelle: Herrera et al. (2022)</p>
        </div>
    );
};

export default CatHuntingImpact;
